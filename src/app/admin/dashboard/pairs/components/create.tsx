import { FC, ReactNode, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputLabel from "@/components/Input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostPairs } from "@/api/adminApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { IsSubmittedObject } from "@/utils/functions/compareObjects";

type Props = {
  children: ReactNode;
};

type Form = {
  baseCurrency: string;
  quoteCurrency: string;
  type: string;
  lastPrice: number;
};

const CreateDialog: FC<Props> = ({ children }) => {
  const { executeMutation: postPair, status: postPairStatus } = usePostPairs();

  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, watch } = useForm<Form>();
  const onSubmit: SubmitHandler<Form> = (data) => {
    const sendData = {
      ...data,
      lastPrice: Number(data.lastPrice),
    };

    postPair(sendData);
    reset();
  };

  useEffect(() => {
    if (postPairStatus === "success") {
      toast({
        description: "Новая пара создана!",
      });
    } else if (postPairStatus === "loading") {
      toast({
        description: <LoadingSpinner />,
      });
    } else if (postPairStatus === "error") {
      toast({
        variant: "destructive",
        description: "Произошла ошибка!",
      });
    }
  }, [postPairStatus]);

  return (
    <Dialog
      onOpenChange={() => {
        reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex flex-col gap-4"}
        >
          <DialogTitle>Создать пару</DialogTitle>
          <DialogDescription />
          <div className={"flex flex-col gap-4"}>
            <div className={"flex w-full gap-2 "}>
              <InputLabel
                label={"Главная валюта"}
                inputProps={{
                  type: "text",
                  ...register("baseCurrency"),
                }}
              />
              <div className={"w-fit flex h-full items-end pb-2"}>
                <Label className={"text-xl"}>/</Label>
              </div>
              <InputLabel
                label={"Зависимая валюта"}
                inputProps={{ type: "text", ...register("quoteCurrency") }}
              />
            </div>
            <InputLabel
              label={"Последняя цена"}
              inputProps={{
                type: "text",
                ...register("lastPrice"),
              }}
            />

            <div>
              <Label>Тип</Label>
              <Select onValueChange={(value) => setValue("type", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="index">index</SelectItem>
                  <SelectItem value="forex">forex</SelectItem>
                  <SelectItem value="stock">stock</SelectItem>
                  <SelectItem value="crypto">crypto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Отмена</Button>
            </DialogClose>
            <Button type={"submit"} disabled={IsSubmittedObject(watch())}>
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
