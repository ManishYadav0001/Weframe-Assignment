import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import AccountProgress from "@/components/AccountProgressCard/AccountProgressCard";
import TotalFranchisees from "@/components/FranchiseesOnboardCard/FranchiseesOnboardCard";
import KeyInsights from "@/components/KeyInsights/KeyInsightsCard";
import FinancialWellbeing from "@/components/FinancialWellbeingCard/FinancialWellbeingCard";
import ProspectLeads from "@/components/ProspectLeadsCard/ProspectLeadsCard";
import UploadsHeader from "@/components/UploadHead/UploadsHeader";
import SearchWithFilters from "@/components/SearchAndFilter/SearchAndFilter";
import DocumentsTable from "@/components/Table/Table";

const rows = [
  { id:'1', name:'Tech requirements.pdf', size:'200 KB', ext:'pdf', docType:'Legal', aiApp:true, dashboard:true, stage:'Full' },
  { id:'2', name:'Dashboard screenshot.jpg', size:'720 KB', ext:'jpg', docType:'Vendors & Assets', aiApp:true, dashboard:true, stage:'Onboarding' },
  { id:'3', name:'Dashboard prototype recording.mp4', size:'16 MB', ext:'mp4', docType:'Technology', aiApp:false, dashboard:true, stage:'Franchisee' },
  { id:'4', name:'Financial Overview', size:'4.2 MB', ext:'doc', docType:'Financial', aiApp:true, dashboard:true, stage:'Prospect' },
  { id:'5', name:'UX Design Guidelines.docx', size:'400 KB', ext:'doc', docType:'Legal', aiApp:true, dashboard:false, stage:'Onboarding' },
  { id:'6', name:'Dashboard interaction.aep', size:'12 MB', ext:'aep', docType:'Legal', aiApp:true, dashboard:true, stage:'Onboarding' },
  { id:'7', name:'Briefing call recording.mp3', size:'18.6 MB', ext:'mp3', docType:'Financial', aiApp:false, dashboard:false, stage:'Prospect' },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Right Content */}
      <div className="flex min-w-0 flex-1 flex-col"> 
        <Header />

        {/* Main Dashboard Content */}
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AccountProgress />
              <div className="flex flex-col gap-6">
                <TotalFranchisees />
                <FinancialWellbeing />
              </div>
              <div className="flex flex-col gap-6">
                <KeyInsights />
                <ProspectLeads />
              </div>
            </div>
          </div>
        </main>

        {/* Documents section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
            <UploadsHeader />
            <div className="h-px w-full bg-gray-200" />
            <div className="p-4">
              <SearchWithFilters />
            </div>

            
            <div className="flow-root"> 
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <DocumentsTable rows={rows} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
