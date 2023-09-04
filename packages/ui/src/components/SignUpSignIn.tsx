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

  return password.length >= 8 ;
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
        {type === "sign-up" ? "Регистрация" : "Войти"}
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
            setPasswordMessage("Пароль должен содержать минимум 8 символов.");
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
        {type === "sign-up" ? "Регистрация" : "Войти"}
      </Button>

      {/* or sign in, in small and less opaque font */}
      <XStack>
        <Paragraph size="$2" mr="$2" opacity={0.4}>
          {type === "sign-up"
            ? "Вы уже зарегистрированны?"
            : "Нет регистрации?"}
        </Paragraph>
        <Link href={type === "sign-up" ? "/signin" : "/signup"}>
          <Paragraph
            cursor={"pointer"}
            size="$2"
            fontWeight={"700"}
            opacity={0.5}
            hoverStyle={{ opacity: 0.4 }}
          >
            {type === "sign-up" ? "Войти" : "Регистрация"}
          </Paragraph>
        </Link>
      </XStack>
    </YStack>
  );
};
