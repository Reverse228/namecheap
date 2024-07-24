import { LogInUser, PostUser, useGetCountry } from "@api";
import { setToken } from "@utils/functions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useLogInRegister = () => {
  const router = useRouter();
  const { data: countries } = useGetCountry();

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

  const {
    executeMutation: logIn,
    data: logInData,
    isLoading: isLoadingLogIn,
    isSuccess: isSuccessLogIn,
    error: logInError,
  } = LogInUser();
  const { executeMutation: register, data: registerData } = PostUser();

  const activeRegButton = Boolean(
    name && surname && email && pass && confirmPass,
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

    const correctEmail = value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    setErrorLogIn(false);

    if (correctEmail || value === "") {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
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
    console.log(value);
    setCountry(value);
  };

  const handleNumber = (value: string) => {
    const normalNumber = value.replace(/[^\d.+]|(?<!^)\+/g, "");

    setNumber(normalNumber);
  };

  const handelRegister = async () => {
    if (
      pass &&
      email &&
      name &&
      surname &&
      confirmPass &&
      number.startsWith("+")
    ) {
      if (pass === confirmPass) {
        setEqualsPass(false);

        const data = {
          email,
          password: pass,
          phone: number,
          country: country ?? countries[0],
          name: `${name} ${surname}`,
        };

        register(data);
      } else {
        setEqualsPass(true);
      }
    }
  };

  const handleLogIn = async () => {
    if (pass && email) {
      logIn({ email, password: pass });
    }
  };

  useEffect(() => {
    const loadToken = async (data: { accessToken: string }) => {
      await setToken(data.accessToken).then((data) => {
        localStorage.setItem("nodeAccess", "true");
        if (data) {
          setTimeout(() => {
            router.push("/assets");
          }, 300);
        }
      });
    };

    if (logInData || registerData) {
      if (logInData) {
        loadToken(logInData);
      } else if (registerData) {
        loadToken(registerData);
      }
    }
  }, [logInData, registerData]);

  useEffect(() => {
    if (logInError?.response?.data?.data) {
      if (
        logInError?.response?.data?.data.toString().includes("UNAUTHORIZED")
      ) {
        setErrorLogIn(true);
      }
    }
  }, [logInError]);

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
    countries,
    isLoadingLogIn,
    isSuccessLogIn,
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
