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
import { SubmitHandler, useForm } from "react-hook-form";
import InputLabel from "@/components/Input";
import { useGetMe, usePostSupport } from "@/api";
import DateTimePicker from "@/components/TimePicker/date-time-picker";
import { Textarea } from "@/components/ui/textarea";
import { IsSubmittedObject } from "@/utils/functions/compareObjects";
import { Skeleton } from "@/components/ui/skeleton";
import { LifeBuoy, SendHorizontal } from "lucide-react";
import dayjs from "dayjs";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

type Props = {
  children: ReactNode;
};

type FormProps = {
  name: string;
  email: string;
  number: string;
  time: string;
  description: string;
};

const Support: FC<Props> = ({ children }) => {
  const { data: userData, status: userStatus } = useGetMe();
  const { executeMutation: postSupport, status: supportStatus } =
    usePostSupport();

  const { toast } = useToast();

  const defaultValues = {
    name: userData?.name ?? "",
    email: userData?.email ?? "",
    number: userData?.phone ?? "",
    time: undefined,
    description: "",
  };

  const { register, handleSubmit, watch, setValue, reset } = useForm<FormProps>(
    {
      defaultValues,
    },
  );
  const onSubmit: SubmitHandler<FormProps> = (data) => {
    const sendData = {
      ...data,
      topic: "Support",
    };

    postSupport(sendData);
    reset();
  };

  useEffect(() => {
    if (supportStatus === "success") {
      toast({
        description: "Сообщение в поддержку отправленно успешно!",
      });
    } else if (supportStatus === "loading") {
      toast({
        description: <LoadingSpinner />,
      });
    } else if (supportStatus === "error") {
      toast({
        variant: "destructive",
        description: "Произошла ошибка!",
      });
    }
  }, [supportStatus]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader className={"space-y-4"}>
            <AlertDialogTitle className={"flex items-center gap-2"}>
              <LifeBuoy /> Запросить поддержку
            </AlertDialogTitle>
            <div className={"flex flex-col gap-4 *:text-foreground my-4 "}>
              {userStatus === "loading" ? (
                <>
                  <div className={"flex gap-2"}>
                    <div className={"flex flex-col gap-2 w-full"}>
                      <Skeleton className={"w-[36px]  h-[14px] rounded-sm"} />
                      <Skeleton className={"max-w-[227px] w-full h-[40px]"} />
                    </div>
                    <div className={"flex flex-col gap-2 w-full"}>
                      <Skeleton className={"w-[52px]  h-[14px] rounded-sm"} />
                      <Skeleton className={"max-w-[227px] w-full h-[40px] "} />
                    </div>
                  </div>
                  <div className={"flex flex-col gap-2 w-full"}>
                    <Skeleton className={"w-[62px]  h-[14px] rounded-sm"} />
                    <Skeleton className={"w-full h-[40px]"} />
                  </div>
                  <Skeleton className={"w-full h-[40px]"} />
                  <Skeleton className={"w-full h-[80px]"} />
                </>
              ) : (
                <>
                  <div className={"flex gap-2"}>
                    <InputLabel
                      label={"Имя"}
                      inputProps={{ type: "text", ...register("name") }}
                    />
                    <InputLabel
                      label={"Почта"}
                      inputProps={{ type: "email", ...register("email") }}
                    />
                  </div>
                  <InputLabel
                    label={"Номер"}
                    inputProps={{ type: "tel", ...register("number") }}
                  />
                  <DateTimePicker
                    getDate={(date) =>
                      setValue("time", dayjs(date).toDate().toString())
                    }
                  />
                  <Textarea
                    placeholder="Тема обсуждения..."
                    {...register("description")}
                  />
                </>
              )}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className={"mt-4"}>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              type={"submit"}
              disabled={IsSubmittedObject(watch())}
              className={"gap-2"}
            >
              Отправить <SendHorizontal size={16} />
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Support;
