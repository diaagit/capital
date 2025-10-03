import Navbar from "../new custom/Navbar";
import PersonalInfo from "../new custom/PersonalInfo";
import Sidebar from "../new custom/Sidebar";

const UserDashboard = () => {
    return (
        <div className="max-w-7xl flex mx-auto">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                {/* <TicketList/> */}
                {/* <TicketDetails/> */}
                {/* <PaymentDetails /> */}
                <PersonalInfo/>
            </div>
        </div>
    );
};

export default UserDashboard;
