import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import "./profile.scss";
import { useEffect, useState } from "react";

//need to be update the users 
const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getProfile");
        const data = await response.json();
        console.log(data); // Log the data to the console

        if (data.data.length > 0) {
          setProfileData(data.data[0]);
        }

        if (data.imageUrls.length > 0) {
          setProfileImage(data.imageUrls[0]);
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    
    <div className="profile">
      <div className="new">
        <Sidebar />
        <div className="newContainer">
        <Navbar/>
          <span className="tops">Admin Account</span>
          <div className="bottom">
            <div className="left">
            {profileImage && <img src={profileImage} alt="Profile" />}
            </div>
            <div className="right">

              <form>
                <div className="formInput">
                  <label>First name</label>
                  <input type="text" placeholder={profileData?.Firstname || 'First Name'} />
                </div>
                <div className="formInput">
                  <label>Last name</label>
                  <input type="text" placeholder={profileData?.Lastname || 'Last Name'} />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input type="text" placeholder={profileData?.Email || 'Email'} />
                </div>
                <div className="formInput">
                  <label>Password</label>
                  <input type="text" placeholder={profileData?.Password || 'Password'}  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Profile;
