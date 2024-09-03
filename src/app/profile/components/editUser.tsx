import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FC, ReactNode, useEffect } from "react";
import { CircleSlash, RefreshCcw } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputLabel from "@/components/Input";
import { useGetCountry, useGetMe, usePatchUser } from "@/api";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IsObjectsEquals } from "@/utils/functions/compareObjects";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

type Props = {
  children: ReactNode;
};

type EditUser = {
  name: string;
  surname: string;
  email: string;
  country: string;
  phone: string;
};

const EditUser: FC<Props> = ({ children }) => {
  const { data: userData, status: userStatus } = useGetMe();
  const { executeMutation: patchUser, status: patchUserStatus } =
    usePatchUser();
  const { data: country } = useGetCountry();

  const { toast } = useToast();

  const defaultValues = {
    name: userData?.name?.split(" ")[0],
    surname: userData?.name?.split(" ")[1],
    email: userData?.email ?? "",
    country: userData?.country ?? "",
    phone: userData?.phone ?? "",
  };

  const { handleSubmit, register, setValue, watch, getValues } =
    useForm<EditUser>({
      defaultValues,
    });

  const onSubmit: SubmitHandler<EditUser> = (data) => {
    if (userData) {
      const sendData = {
        name: `${data.name} ${data.surname}` ?? "",
        country: data.country ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
      };

      patchUser(sendData);
    }
  };

  useEffect(() => {
    if (patchUserStatus === "success") {
      toast({
        description: "Данные были обновленны успешно!",
      });
    } else if (patchUserStatus === "loading") {
      toast({
        description: <LoadingSpinner />,
      });
    } else if (patchUserStatus === "error") {
      toast({
        variant: "destructive",
        description: "Произошла ошибка!",
      });
    }
  }, [patchUserStatus]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader className={"space-y-4"}>
            <AlertDialogTitle>Обновить данные</AlertDialogTitle>
            <div className={"flex flex-col gap-4"}>
              <div className={"flex gap-2"}>
                <InputLabel
                  label={"Имя"}
                  inputProps={{ type: "text", ...register("name") }}
                />
                <InputLabel
                  label={"Фамилия"}
                  inputProps={{ type: "text", ...register("surname") }}
                />
              </div>
              <InputLabel
                label={"Почта"}
                inputProps={{ type: "email", ...register("email") }}
              />
              <div className={"flex gap-2"}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor={"country"} className={"ml-1"}>
                    Страна*
                  </Label>
                  <Select
                    name={"country"}
                    defaultValue={getValues("country")}
                    onValueChange={(value) => setValue("country", value)}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={country ? country[0] : ""}
                        id={"country"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {country ? (
                          country?.map((item) => (
                            <SelectItem value={item} key={item}>
                              {item}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value={"noOption"} disabled>
                            Нету вариантов
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <InputLabel
                  label={"Телефон"}
                  inputProps={{
                    type: "tel",
                    ...register("phone"),
                  }}
                />
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className={"mt-6"}>
            <AlertDialogCancel className={"gap-2"}>
              <CircleSlash size={16} /> Отменить
            </AlertDialogCancel>
            <AlertDialogAction
              className={"gap-2"}
              type={"submit"}
              disabled={IsObjectsEquals(defaultValues, watch())}
            >
              <RefreshCcw size={16} />
              Обновить
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditUser;
