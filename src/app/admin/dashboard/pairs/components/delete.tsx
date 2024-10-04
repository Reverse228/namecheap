import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AdminPairsActions } from "@/utils/types";
import { FC } from "react";
import { useDeletePairs } from "@/api/adminApi";

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

const DeleteAlert: FC<Props> = ({ open, close, data }) => {
  const { executeMutation: deletePair, status } = useDeletePairs();

  const handleDelete = () => {
    console.log(data);

    data && deletePair(data);
  };

  return (
    <AlertDialog open={open === "delete"} onOpenChange={close}>
      <AlertDialogContent>
        {data ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Удалить пару {data?.baseCurrency} / {data?.quoteCurrency}
              </AlertDialogTitle>
              <AlertDialogDescription>
                После удаление пару нельзя будет восстановить. Вы уверенны?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <></>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
