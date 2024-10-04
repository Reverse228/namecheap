import { AdminUsersActions } from "@/utils/types";
import { MeUserApi } from "@/api/GetMe";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/Input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetCountry } from "@/api";
import {
  PatchUserByAdmin,
  usePatchUserByAdmin,
  usePostAddBalance,
} from "@/api/adminApi";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IsObjectsEquals } from "@/utils/functions/compareObjects";

type Props = {
  data: MeUserApi;
  open: AdminUsersActions;
  close: () => void;
};

type Form = {
  name: string;
  surname: string;
  email: string;
  role: string;
  accountStatus: string;
  country: string;
  phone: string;
  depositWallet: string;
};

const EditDialog: FC<Props> = ({
  data: {
    id,
    name,
    email,
    role,
    accountStatus,
    country,
    phone,
    assetBalances,
    depositWallet,
  },
  open,
  close,
}) => {
  const { data: countryData } = useGetCountry();
  const {
    executeMutation: updateUserByAdmin,
    status: updateUserByAdminStatus,
  } = usePatchUserByAdmin();

  const { toast } = useToast();

  const defaultValues: Form = {
    name: name?.split(" ")[0] ?? "",
    surname: name?.split(" ")[1] ?? "",
    email: email ?? "",
    role: role ?? "",
    accountStatus: accountStatus,
    country: country ?? "",
    phone: phone ?? "",
    depositWallet: depositWallet ?? "",
  };

  const { register, setValue, handleSubmit, reset, watch } = useForm<Form>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<Form> = (formData) => {
    const sendData: PatchUserByAdmin = {
      id: id ?? "",
      name: `${formData.name} ${formData.surname}`,
      email: formData.email,
      assetBalances: assetBalances,
      accountStatus: formData.accountStatus,
      phone: formData.phone,
      country: formData.country,
      role: formData.role,
      depositWallet: formData.depositWallet,
    };

    updateUserByAdmin(sendData);
    reset();
  };

  useEffect(() => {
    if (updateUserByAdminStatus === "error") {
      toast({
        variant: "destructive",
        description: "Произошла ошибка! Данные пользователя небыли обновленны",
      });
    } else if (updateUserByAdminStatus === "success") {
      toast({
        description: "Данные пользователя были оновленны успешно!",
      });
      close();
    }
  }, [updateUserByAdminStatus]);

  return (
    <Dialog open={open === "edit"} onOpenChange={close}>
      <DialogContent>
        <form
          className={"flex flex-col gap-4"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogHeader>
            <DialogTitle>Редактировать пользователя {name}</DialogTitle>
          </DialogHeader>
          <div className={"flex flex-col gap-4"}>
            {/* NAME & SURNAME */}
            <div className={"flex gap-2"}>
              <InputLabel
                label={"Имя"}
                inputProps={{
                  type: "text",
                  ...register("name"),
                }}
              />
              <InputLabel
                label={"Фамилия"}
                inputProps={{
                  type: "text",
                  ...register("surname"),
                }}
              />
            </div>

            {/* EMAIL */}
            <InputLabel
              label={"Почта"}
              inputProps={{
                type: "email",
                ...register("email"),
              }}
            />

            {/* STATUS & ROLE SELECTS */}
            <div className={"flex gap-2"}>
              <div className={"flex flex-col gap-1.5 w-full"}>
                <Label>Роль</Label>
                <Select
                  defaultValue={watch("role") ?? undefined}
                  onValueChange={(value) => setValue("role", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className={"flex flex-col gap-1.5 w-full"}>
                <Label>Статус</Label>
                <Select
                  defaultValue={watch("accountStatus") ?? undefined}
                  onValueChange={(value) => setValue("accountStatus", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* CITY | NUMBER */}
            <div className={"flex gap-2"}>
              <div className={"flex w-full flex-col gap-1.5"}>
                <Label htmlFor={"country"} className={"ml-1"}>
                  Страна*
                </Label>
                <Select
                  name={"country"}
                  defaultValue={watch("country") ?? ""}
                  onValueChange={(value) => setValue("country", value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={watch("country") ?? ""}
                      id={"country"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {countryData ? (
                        countryData?.map((item) => (
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
                  type: "text",
                  ...register("phone"),
                }}
              />
            </div>
            <InputLabel
              label={"Кошелек"}
              inputProps={{
                type: "text",
                ...register("depositWallet"),
              }}
            />
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant={"secondary"}>Отмена</Button>
            </DialogClose>
            <Button
              type={"submit"}
              disabled={
                updateUserByAdminStatus === "loading" ||
                IsObjectsEquals(defaultValues, watch())
              }
              className={"min-w-[100px]"}
            >
              {updateUserByAdminStatus === "loading" ? (
                <LoadingSpinner />
              ) : (
                "Обновить"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
