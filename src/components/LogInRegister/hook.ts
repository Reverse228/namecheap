import { LogInUser, PostUser } from "@api";
import { setToken } from "@utils/functions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogInRegister = () => {
  const router = useRouter();

  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [pass, setPass] = useState<string | null>(null);
  const [confirmPass, setConfirmPass] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [number, setNumber] = useState<string>("+");

  const [equalsPass, setEqualsPass] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorLogIn, setErrorLogIn] = useState<boolean>(false);

  const [errorDesc, setErrorDesc] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<boolean>(false);

  const activeRegButton = Boolean(
    name && surname && email && pass && confirmPass
  );

  const activeLogInButton = Boolean(email && pass);

  const handleName = (value: string) => {
    setName(value);
  };

  const handleSurname = (value: string) => {
    setSurname(value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);

    setErrorLogIn(false);
    setEmailErr(false);
  };

  const handlePass = (value: string) => {
    setPass(value);

    setErrorLogIn(false);
  };

  const handleConfirmPass = (value: string) => {
    setConfirmPass(value);

    setEqualsPass(false);
  };

  const handleCity = (value: string) => {
    setCountry(value);
  };

  const handleNumber = (value: string) => {
    setNumber(value);
  };

  const handelRegister = async () => {
    if (
      pass &&
      email &&
      name &&
      surname &&
      confirmPass &&
      country &&
      number.startsWith("+")
    ) {
      if (pass === confirmPass) {
        setEqualsPass(false);

        const data = {
          email,
          password: pass,
          phone: number,
          country,
          name: `${name} ${surname}`,
        };

        const response: any = await PostUser(data);

        if (response.accessToken) {
          setIsSuccess(true);
          const token = await setToken(response.accessToken);

          token && router.push("/assets");
        } else {
          setErrorDesc(response.response.data.data);
          setEmailErr(true);
        }
      } else {
        setEqualsPass(true);
      }
    }
  };

  const handleLogIn = async () => {
    if (pass && email) {
      const response = await LogInUser(email, pass);

      if (response) {
        setIsSuccess(true);
        const token = await setToken(response.accessToken);

        token && router.push("/assets");
      } else {
        setErrorLogIn(true);
      }
    }
  };

  return {
    router,
    activeRegButton,
    equalsPass,
    activeLogInButton,
    isSuccess,
    errorLogIn,
    number,
    errorDesc,
    emailErr,
    handles: {
      handleConfirmPass,
      handleEmail,
      handleName,
      handlePass,
      handleSurname,
      handelRegister,
      handleLogIn,
      handleCity,
      handleNumber,
    },
  };
};
