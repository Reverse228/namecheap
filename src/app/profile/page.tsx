"use client";

import MainWrapper from "@/components/MainWrapper/layout";
import { useGetMe, usePatchUser, usePostSupport } from "@/api";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  CircleArrowOutUpRight,
  CircleFadingPlus,
  LifeBuoy,
  LogOut,
  Send,
  User,
  UserPen,
  WalletCards,
} from "lucide-react";
import FillWallet from "@/components/FillWallet";
import { Skeleton } from "@/components/ui/skeleton";
import NoUserLogin from "@/components/NoUserLogin";
import { useRouter } from "next/navigation";
import { destroyToken } from "@/utils/functions/authentication";
import { ADMIN_DASHBOARD, LOGIN } from "@/utils/constants";
import Withdrawal from "@/app/profile/components/withdrawal";
import Support from "@/components/Support/support";
import React from "react";
import EditUser from "@/app/profile/components/editUser";
import Link from "next/link";

const Page = () => {
  const router = useRouter();

  const { data: userData, status: userStatus } = useGetMe();

  const mainBalance = userData?.assetBalances.find(
    ({ currency }) => currency === "USD",
  );

  const restBalances = userData?.assetBalances.filter(
    ({ currency }) => currency !== "USD",
  );

  // const handleCopyAddress = () => {
  //   navigator.clipboard
  //     .writeText(userData?.depositWallet as string)
  //     .then(() => {
  //       toast({
  //         title: "Адресс кошелька скопирован!",
  //       });
  //     });
  // };

  const handleExist = () => {
    localStorage.removeItem("nodeAccess");
    destroyToken();

    router.push(LOGIN);
  };

  const handleMailClick = () => {
    const mailto = "mailto:example@example.com";
    window.location.href = mailto;
  };

  return (
    <MainWrapper menu={"/profile"}>
      {userStatus === "loading" ? (
        <div>
          <div className={"flex gap-2"}>
            <Skeleton className={"w-[120px] h-[14px] rounded-full"} />
            <Skeleton className={"w-[60px] h-[14px] rounded-full"} />
          </div>
          <div className={"flex flex-col gap-4 mt-11"}>
            <Skeleton className={"w-full h-[193px] rounded-lg"} />
            <div className={"flex gap-4"}>
              <Skeleton className={"w-full h-[40px]"} />
              <Skeleton className={"w-full h-[40px]"} />
            </div>
            <Skeleton className={"w-full h-[202px] rounded-lg"} />
            <Skeleton className={"w-full h-[40px]"} />
            <Skeleton className={"w-full h-[40px]"} />
          </div>
        </div>
      ) : userStatus === "success" ? (
        <>
          <header
            className={"flex border-b pb-6 mb-5 items-center justify-between"}
          >
            <div className={"flex gap-2"}>
              <Label className={"text-muted-foreground"}>С возвращением</Label>
              <Label>{userData?.name}</Label>
            </div>

            {userData?.role === "ADMIN" && (
              <Button variant={"link"} size={"sm"} className={"gap-1"}>
                <Link href={ADMIN_DASHBOARD} target={"_blank"}>
                  Админ панель
                </Link>
                <ArrowUpRight size={16} />
              </Button>
            )}
          </header>
          <div className={"flex flex-col gap-4"}>
            <Card>
              <CardHeader>
                <CardTitle className={"text-xl flex gap-2 items-center"}>
                  <WalletCards /> Балансы
                </CardTitle>
              </CardHeader>
              <CardContent className={"flex flex-col gap-3"}>
                <div className={"flex items-center justify-between"}>
                  <Label className={" text-base flex items-center"}>
                    Главный счет (USD)
                  </Label>
                  <Label className={"text-base"}>
                    {mainBalance?.balance} {mainBalance?.currency}
                  </Label>
                </div>
                <div className={"flex items-center justify-between"}>
                  <Label className={"text-muted-foreground"}>Замороженно</Label>
                  <Label>
                    {mainBalance?.frozenBalance} {mainBalance?.currency}
                  </Label>
                </div>
                {restBalances?.length ? (
                  <>
                    <Separator />
                    {restBalances?.length && (
                      <Accordion collapsible type={"single"}>
                        <AccordionItem
                          value={"moreBalances"}
                          className={"border-0"}
                        >
                          <AccordionTrigger className={"pt-0"}>
                            <Label>Все балансы</Label>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className={"flex flex-col gap-3"}>
                              {restBalances?.map(
                                ({ balance, currency, frozenBalance }, idx) => (
                                  <>
                                    <div
                                      className={
                                        "flex items-center justify-between"
                                      }
                                    >
                                      <Label className={" text-base"}>
                                        {currency}
                                      </Label>
                                      <Label
                                        className={cn(
                                          "",
                                          !balance
                                            ? "text-muted-foreground"
                                            : balance > 0
                                              ? "text-primary"
                                              : balance < 0 &&
                                                "text-destructive",
                                        )}
                                      >
                                        {balance} {currency}
                                      </Label>
                                    </div>
                                    <div
                                      className={
                                        "flex items-center justify-between"
                                      }
                                    >
                                      <Label
                                        className={"text-muted-foreground"}
                                      >
                                        Замороженно
                                      </Label>
                                      <Label
                                        className={
                                          !frozenBalance
                                            ? "text-muted-foreground"
                                            : frozenBalance > 0
                                              ? "text-primary"
                                              : frozenBalance < 0
                                                ? "text-red-600"
                                                : ""
                                        }
                                      >
                                        {frozenBalance} {currency}
                                      </Label>
                                    </div>
                                    <Separator className={"my-2"} />
                                  </>
                                ),
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </CardContent>
            </Card>
            {/*<Card>*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle className={"text-xl flex gap-2 items-center"}>*/}
            {/*      <Wallet /> Кошелек*/}
            {/*    </CardTitle>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <div*/}
            {/*      className={*/}
            {/*        "flex justify-between items-center flex-wrap gap-1"*/}
            {/*      }*/}
            {/*    >*/}
            {/*      <Label className={"text-muted-foreground"}>*/}
            {/*        Адресс кошелька:*/}
            {/*      </Label>*/}
            {/*      <div className={"flex gap-2 items-center"}>*/}
            {/*        <Label*/}
            {/*          className={*/}
            {/*            "overflow-hidden text-ellipsis whitespace-nowrap max-[660px]:yarn w-[200px]"*/}
            {/*          }*/}
            {/*        >*/}
            {/*          {userData?.depositWallet}*/}
            {/*        </Label>*/}
            {/*        <Button*/}
            {/*          variant={"secondary"}*/}
            {/*          size={"icon"}*/}
            {/*          className={"justify-self-end"}*/}
            {/*          onClick={handleCopyAddress}*/}
            {/*        >*/}
            {/*          <Copy className={"w-5"} />*/}
            {/*        </Button>*/}
            {/*        <AlertDialog>*/}
            {/*          <AlertDialogTrigger asChild>*/}
            {/*            <Button size={"icon"} variant={"secondary"}>*/}
            {/*              <QrCode className={"w-5"} />*/}
            {/*            </Button>*/}
            {/*          </AlertDialogTrigger>*/}
            {/*          <AlertDialogContent>*/}
            {/*            <AlertDialogHeader>*/}
            {/*              <QRCode*/}
            {/*                value={userData?.depositWallet as string}*/}
            {/*                style={{*/}
            {/*                  height: "auto",*/}
            {/*                  maxWidth: "100%",*/}
            {/*                  width: "100%",*/}
            {/*                }}*/}
            {/*                bgColor={"transparent"}*/}
            {/*                fgColor={"white"}*/}
            {/*                level={"Q"}*/}
            {/*              />*/}
            {/*            </AlertDialogHeader>*/}
            {/*            <AlertDialogFooter>*/}
            {/*              <AlertDialogCancel>Зактрыть</AlertDialogCancel>*/}
            {/*            </AlertDialogFooter>*/}
            {/*          </AlertDialogContent>*/}
            {/*        </AlertDialog>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
            <div className={"w-full flex gap-4"}>
              <FillWallet wallet={userData?.depositWallet ?? ""}>
                <Button className={"w-full gap-2"}>
                  <CircleFadingPlus size={16} /> Пополнить баланс
                </Button>
              </FillWallet>
              <Withdrawal>
                <Button variant={"secondary"} className={"w-full gap-2"}>
                  <CircleArrowOutUpRight size={16} /> Вывести средства
                </Button>
              </Withdrawal>
            </div>
            <Card>
              <CardHeader
                className={"flex-row justify-between space-y-0 items-center "}
              >
                <CardTitle className={"text-xl flex gap-2 items-center"}>
                  <User /> Данные пользователя
                </CardTitle>
                <CardDescription>
                  <EditUser>
                    <Button variant={"ghost"} size={"sm"} className={"gap-2"}>
                      <UserPen size={18} /> Редактировать
                    </Button>
                  </EditUser>
                </CardDescription>
              </CardHeader>
              <CardContent className={"flex flex-col gap-3"}>
                <div className={"flex items-center justify-between"}>
                  <Label className={"text-muted-foreground "}>Имя</Label>
                  <Label>{userData?.name}</Label>
                </div>
                <div className={"flex items-center justify-between"}>
                  <Label className={"text-muted-foreground"}>Почта</Label>
                  <Label>{userData?.email}</Label>
                </div>
                <div className={"flex items-center justify-between"}>
                  <Label className={"text-muted-foreground"}>
                    Номер телефона
                  </Label>
                  <Label>{userData?.phone}</Label>
                </div>
                <div className={"flex items-center justify-between"}>
                  <Label className={"text-muted-foreground"}>Страна</Label>
                  <Label>{userData?.country}</Label>
                </div>
              </CardContent>
            </Card>
            <div className={"w-full flex flex-col gap-4"}>
              <div className={"w-full flex gap-4"}>
                <Support>
                  <Button variant={"secondary"} className={"w-full gap-2"}>
                    <LifeBuoy size={16} /> Запросить поддержку
                  </Button>
                </Support>
                <Button
                  variant={"secondary"}
                  className={"w-full gap-2"}
                  onClick={handleMailClick}
                >
                  <Send size={16} /> Отправить сообщение
                </Button>
              </div>

              <Button
                variant={"outline"}
                className={"w-full gap-2"}
                onClick={handleExist}
              >
                <LogOut size={16} /> Выйти из системы
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <NoUserLogin
            label={"чтобы иметь доступ к профилю"}
            userStatus={userStatus}
          />
          <div className={"w-full flex justify-center"}>
            <Label className={"text-muted-foreground text-xl text-center "}>
              Профиль недоступен
            </Label>
          </div>
        </>
      )}
    </MainWrapper>
  );
};

export default Page;
