import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LOGIN, REGISTER } from "@/utils/constants";
import { BadgePlus, KeyRound } from "lucide-react";

const PleaseAuthButtons = () => {
  const router = useRouter();

  const handleLogIn = () => {
    router.push(LOGIN);
  };

  const handleRegister = () => {
    router.push(REGISTER);
  };

  return (
    <div className={"flex gap-2"}>
      <Button
        variant={"secondary"}
        onClick={handleLogIn}
        className={"flex gap-1"}
      >
        <KeyRound size={14} /> Войти
      </Button>
      <Button onClick={handleRegister} className={"flex gap-1"}>
        <BadgePlus size={14} /> Зарегестрироатся
      </Button>
    </div>
  );
};

export default PleaseAuthButtons;
