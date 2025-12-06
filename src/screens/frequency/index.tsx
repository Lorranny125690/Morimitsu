import { FrequencyDesktop } from "./frequency";
import { FrequencyMobile } from "./frequencyMobile";

export function Frequency () {
  return(
    <div>
      <div className="hidden lg:block">
        <FrequencyDesktop />
      </div>
      <div className="block lg:hidden">
        <FrequencyMobile/>
      </div>
    </div>
  )

}