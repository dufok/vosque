import { useState } from "react";
import {
  YStack,
  Paragraph,
  XStack,
  Button,
  Input,
  Image,
  Stack,
} from "tamagui";
import { Link } from "solito/link";
import { OAuthStrategy } from "@clerk/types";
//changes
interface Props {
  type: "sign-up" | "sign-in";
  handleOAuthWithPress: (strategy: OAuthStrategy) => void;
  handleEmailWithPress: (emailAddress, password) => void;
}

function isValidPassword(password) {
  const hasNumber = /\d/;
  const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/;

  return password.length >= 8 && hasNumber.test(password) && hasSpecialSymbol.test(password);
}

export const SignUpSignInComponent: React.FC<Props> = ({
  type,
  handleOAuthWithPress,
  handleEmailWithPress,
}) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  return (
    <YStack
      borderRadius="$10"
      space
      px="$7"
      py="$6"
      w={350}
      shadowColor={"#00000020"}
      shadowRadius={26}
      shadowOffset={{ width: 0, height: 4 }}
      bg="$background"
    >
      <Paragraph size="$5" fontWeight={"700"} opacity={0.8} mb="$1">
        {type === "sign-up" ? "Create your account" : "Log in to your account"}
      </Paragraph>
      {/* all the oauth sign up options */}
      {/* email sign up option */}
      <Input
        placeholder="Email"
        onChangeText={(text) => {
          setEmailAddress(text);
        }}
      />
      <Input
        placeholder="Password"
        onChangeText={(text) => {
          setPassword(text);
          if (isValidPassword(text)) {
            setPasswordMessage("");
          } else {
            setPasswordMessage("Password must contain a number, a special symbol and at least 8 characters long ");
          }
        }}
        textContentType="password"
        secureTextEntry
      />
      
      {passwordMessage && (
        <Paragraph size="$2" color="red" opacity={0.5}>
          {passwordMessage}
        </Paragraph>
      )}

      {/* sign up button */}
      <Button
        themeInverse
        onPress={() => {
          handleEmailWithPress(emailAddress, password);
        }}
        hoverStyle={{ opacity: 0.8 }}
        onHoverIn={() => {}}
        onHoverOut={() => {}}
        focusStyle={{ scale: 0.975 }}
      >
        {type === "sign-up" ? "Sign up" : "Sign in"}
      </Button>

      {/* or sign in, in small and less opaque font */}
      <XStack>
        <Paragraph size="$2" mr="$2" opacity={0.4}>
          {type === "sign-up"
            ? "Already have an account?"
            : "Don’t have an account?"}
        </Paragraph>
        <Link href={type === "sign-up" ? "/signin" : "/signup"}>
          <Paragraph
            cursor={"pointer"}
            size="$2"
            fontWeight={"700"}
            opacity={0.5}
            hoverStyle={{ opacity: 0.4 }}
          >
            {type === "sign-up" ? "Sign in" : "Sign up"}
          </Paragraph>
        </Link>
      </XStack>
    </YStack>
  );
};
