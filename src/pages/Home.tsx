import { useAuth0 } from "@auth0/auth0-react";
import { Accounts, Transactions } from ".";
import HomeNonAuthentcatedCard from "@/components/HomeNonAuthentcatedCard";
import SpendingsGroupedByCategory from "@/components/charts/SpendingsGroupedByCategory";
import SpendingsGroupedByMonthAndAmount from "@/components/charts/SpendingsGroupedByMonthAndAmount";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
     <HomeNonAuthentcatedCard />
    ); 
  }
  return (
    <div className="w-full flex flex-wrap mr-4">
      <div className="p-3 w-full lg:w-1/2 2xl:w-1/3">
        <Accounts readonly={true} />
      </div>        
      <div className="p-3 w-full lg:w-1/2 2xl:w-1/3">
        <SpendingsGroupedByCategory  />
      </div>      
      <div className="p-3 w-full lg:w-1/2 2xl:w-1/3">
        <SpendingsGroupedByMonthAndAmount  />
      </div>      
      <div className="p-3 w-full lg:w-1/2 2xl:w-full">
        <Transactions readonly={true} />
      </div>
    </div>
  );
};

export default Home;
