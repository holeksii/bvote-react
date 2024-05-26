
import { useTranslation } from "react-i18next";


interface SlotComponentProps {
  info: Record<string, { value: any; type: string, i18nKey?: string

   }>;
}

const SlotComponent = ({ info }: SlotComponentProps) => {

  const {t} = useTranslation();

  function fixUrl(url: string) {
    // if not starts with http and not starts with / then add https
    if (!url.startsWith("http") && !url.startsWith("/")) {
      return "https://" + url;
    }
    return url;
  }

  return (
    <div>
      {Object.entries(info).map(([key, value]) => {
        return (
          <div className="flex justify-between gap-1" key={key}>
            <div>
            
              {value.i18nKey ? t(value.i18nKey) : key}
              </div>
            <div className="text-right font-light w-2/5">
              {
                // if key is status
                value.type === "status" ? (
                  <div className="flex flex-row items-center justify-end gap-2">
                    <div>

                    {t('generic.status.'+value.value.toString().toLowerCase())}
                    
                    </div>
                    <div
                      className={`h-2 w-2 rounded-full ${value.value === "active" ? "animate-pulse bg-green-500" : "bg-red-500"}`}
                    ></div>
                  </div>
                ) : value.type === "address" || value.type === "url" ? (
                  <a
                    className="underline-offset-2 hover:underline text-blue-400"
                    target="_blank"
                    href={
                      value.type === "address"
                        ? "https://testnet.tonscan.org/address/" +
                          value.value.toString()
                        : fixUrl(value.value.toString())
                    }
                  >
                    <div className="truncate">{value.value.toString()}</div>
                  </a>
                ) : (
                  value.value.toString()
                )
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SlotComponent;
