import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";

//this should be the same as your next js frontend key
const frontendApi = "pk_test_Ym9sZC10ZWFsLTU3LmNsZXJrLmFjY291bnRzLmRldiQ"; //enter your clerk key here!

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (typeof frontendApi === "undefined") 
    throw new Error(
      "You forgot to add Clerk's frontend API key to your environment variables."
    );
  

  return (
    <ClerkProvider
      frontendApi={frontendApi}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
}
