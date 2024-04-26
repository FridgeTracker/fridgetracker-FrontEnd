import "./dashboard.css";

import serverIcon from "../assets/systemIcon.png";
import adminIcon from "../assets/membersIcon.png";


function Notifications ({user}) {

    function getClassForAlertType(alertType) {
        switch(alertType) {
          case "Response":
            return "responseText";
          case "Alert":
            return "alertText";
          case "Notification":
            return "notificationText";
          case "Reminder":
            return "reminderText";
          default:
            return "";
        }
      }

      const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toISOString().split('T')[0]; // Extracting the date part
      };

    return (
        <div className="notificationWrapper">
            <div className="recordTopBarNoti">
                <p>Recent Notifications</p>
            </div>
            <div className="directional_bar_noti">
                <table className="notiTable">
                    <tr>
                        <td>From</td>
                        <td>Type</td>
                        <td>Message</td>
                        <td>Date</td>
                    </tr>
                </table>
            </div>
            <div className="notiContent">
            <table className="notiTableContent">
                <tbody>
                {user && user.notification.map((noti) => (
                    <tr>
                    <td>{noti.sender === "Admin" ? 
                        <><img className={noti.sender} src={adminIcon} alt="admin"/>  {noti.sender}</> : 
                        <><img className={noti.sender} src={serverIcon} alt="server"/> {noti.sender}</>}</td>

                    <td className={getClassForAlertType(noti.alert_type)}>{noti.alert_type}</td>
                        <td>{noti.message}</td>
                        <td>{formatDate(noti.dateTime)}</td>
                    </tr>
                     
                )
            )}
                </tbody>
            </table>
            </div>
        </div>
    )

}

export default Notifications;