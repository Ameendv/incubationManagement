import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
  } from "react-pro-sidebar";
  
  //import icons from react icons
  import { FaList, FaRegHeart } from "react-icons/fa";
  import {
    FiHome,
    FiLogOut,
    FiArrowLeftCircle,
    FiArrowRightCircle
  } from "react-icons/fi";
  import { RiPencilLine } from "react-icons/ri";
  import { BiCog } from "react-icons/bi";
  
  //import sidebar css from react-pro-sidebar module and our custom css
  import "react-pro-sidebar/dist/css/styles.css";
  import "./Header.css";

function Header() {

    const [menuCollapse, setMenuCollapse] = useState(false);
    const navigate=useNavigate()

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
      //condition checking to change state from true to false and vice versa
      menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
  
  return (
    <div >
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />} onClick={()=>{navigate('/dashboard')}}>
                Applicant List
              </MenuItem>
              <MenuItem icon={<FaList />} onClick={()=>{navigate('/records')}}>Record Track</MenuItem>
              <MenuItem icon={<FaRegHeart />} onClick={()=>{navigate('/slot')}}>Booking List</MenuItem>
              <MenuItem icon={<RiPencilLine />}>Schedule Events</MenuItem>
              <MenuItem icon={<BiCog />}>Videos</MenuItem>
              <MenuItem icon={<BiCog />}>Payments</MenuItem>
              
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </div>
  )
}

export default Header
