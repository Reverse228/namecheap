import AnalysisSvg from "../../../public/svg/AnalysisSvg";
import CompressSvg from "../../../public/svg/CompressSvg";
import GraphBarSvg from "../../../public/svg/GraphBarSvg";
import HistorySvg from "../../../public/svg/HistorySvg";
import ProfileSvg from "../../../public/svg/ProfileSvg";

export const MenuContent = [
  {
    id: 0,
    name: "Активы",
    path: "/assets",
    Icon: GraphBarSvg,
  },
  {
    id: 1,
    name: "Торговать",
    path: "/trade",
    Icon: AnalysisSvg,
  },
  {
    id: 2,
    name: "Сделки",
    path: "/deals",
    Icon: CompressSvg,
  },
  {
    id: 3,
    name: "История",
    path: "/history",
    Icon: HistorySvg,
  },
  {
    id: 4,
    name: "Профиль",
    path: "/profile",
    Icon: ProfileSvg,
  },
];
