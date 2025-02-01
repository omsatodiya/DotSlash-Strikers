import {
  SignIn,
  SignUp,
  UserButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";

function App() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <h1>Welcome to My App</h1>
      {isSignedIn ? (
        <div>
          <p>You are signed in!</p>
          <UserButton />
        </div>
      ) : (
        <div>
          <SignedOut>
            <SignIn />
          </SignedOut>
          <SignedIn>
            <p>You are signed in!</p>
            <UserButton />
          </SignedIn>
        </div>
      )}
    </div>
  );
}

export default App;
