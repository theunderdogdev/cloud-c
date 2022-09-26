import "./App.css";
import { initializeApp } from "firebase/app";
import { serverTimestamp } from "firebase/firestore";
import {
	collection,
	getFirestore,
	query,
	orderBy,
	limit,
	addDoc,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState, useRef } from "react";
const app = initializeApp({
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId,
});
const auth = getAuth(app);
const db = getFirestore(app);
function App() {
	const [user] = useAuthState(auth);
	return (
		<div className="App">
			<header>
				<h1>Chatroom</h1>
				<SignOut />
			</header>

			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</div>
	);
}
function SignIn() {
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};
	return (
		<>
			<button className="sign-in" onClick={signInWithGoogle}>
				Sign in with Google
			</button>
		</>
	);
}
function SignOut() {
	return (
		auth.currentUser && (
			<button className="sign-out" onClick={() => auth.signOut()}>
				Sign Out
			</button>
		)
	);
}
const collName = process.env.REACT_APP_collName;
function ChatRoom() {
	const messageRef = collection(db, collName);
	const q = query(messageRef, orderBy("createdAt"), limit(25));
	const [allMessages] = useCollection(q);
	const [formValue, setFormValue] = useState("");
	const dummy = useRef();
	const sendMessage = async (e) => {
		e.preventDefault();
		const { uid, displayName } = auth.currentUser;
		await addDoc(messageRef, {
			text: formValue,
			createdAt: serverTimestamp(),
			uid,
			displayName,
		});
		setFormValue("");
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<>
			<main>
				{allMessages?.docs.map((message) => {
					return <ChatMessage key={message.id} message={message.data()} />;
				})}
				<span ref={dummy}></span>
			</main>
			<form onSubmit={sendMessage}>
				<input
					type="text"
					value={formValue}
					onChange={(e) => {
						setFormValue(e.target.value);
					}}
				/>
				<button type="submit" disabled={!formValue}>
					Send
				</button>
			</form>
		</>
	);
}
function ChatMessage(props) {
	const { text, uid, displayName } = props.message;

	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
	return (
		<div className={"message " + messageClass}>
			<div className="text">
				<div className="name">
					{messageClass === "sent" ? "You" : displayName}
				</div>
				{text}
			</div>
		</div>
	);
}
export default App;
