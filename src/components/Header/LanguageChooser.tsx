import { useTranslation } from "react-i18next";

export default () => {
  const { i18n } = useTranslation();

  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => {
          i18n.changeLanguage(i18n.language === "en" ? "ua" : "en");
        }}
        title={t("lang.change")}
        className="text-gray-200 text-xl hover:text-white flex gap-2 hover:bg-slate-800 transition-colors rounded-3xl px-2 py-1"
      >
        <span className="text-gray-400">{i18n.language}</span>
        <span>{i18n.language === "en" ? "🇺🇸" : "🇺🇦"}</span>
      </button>
    </div>
  );
};
