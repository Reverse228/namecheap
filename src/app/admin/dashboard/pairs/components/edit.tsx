import { AdminPairsActions } from "@/utils/types";
import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/Input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { IsObjectsEquals } from "@/utils/functions/compareObjects";

type Props = {
  data:
    | {
        baseCurrency: string;
        quoteCurrency: string;
        type: string;
        lastPrice: number;
      }
    | undefined;
  open: AdminPairsActions;
  close: () => void;
};

type Form = {
  baseCurrency: string;
  quoteCurrency: string;
  type: string;
  lastPrice: number;
};

const EditDialog: FC<Props> = ({ data, open, close }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Form>({
    defaultValues: data,
  });
  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
  };

  return (
    <Dialog
      open={open === "edit"}
      onOpenChange={() => {
        close();
        reset();
      }}
    >
      <DialogContent>
        {data ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={"flex flex-col gap-4"}
          >
            <DialogTitle>
              Изменить пару {data?.baseCurrency}/{data?.quoteCurrency}
            </DialogTitle>
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
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  defaultValue={data.type}
                >
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
              <Button type={"submit"} disabled={IsObjectsEquals(data, watch())}>
                Именить
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
