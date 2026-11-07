import DoctorAuthoritySection from "@/components/DoctorAuthoritySection";
import DentalAnxietyNavigator from "@/components/DentalAnxietyNavigator";
import PatientProofSection from "@/components/PatientProofSection";
import NewPatientsSection from "@/components/NewPatientsSection";
import InsuranceFinancingSection from "@/components/InsuranceFinancingSection";
import PatientInfoSection from "@/components/PatientInfoSection";
import SanJoseLocationSection from "@/components/SanJoseLocationSection";

// Launch-tier homepage sections, in the order the launch-tier README recommends.
export default function LaunchTierAdditions() {
  return (
    <>
      <DoctorAuthoritySection />
      <DentalAnxietyNavigator />
      <PatientProofSection />
      <NewPatientsSection />
      <InsuranceFinancingSection />
      <PatientInfoSection />
      <SanJoseLocationSection />
    </>
  );
}
