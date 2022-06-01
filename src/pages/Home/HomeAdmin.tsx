import { Admin } from "../../User/component/admin/Admin";
import { Header } from "../../User/component/header/Header";
import { NavBar } from "../../User/component/nav_bar/NavBar";
import { Products } from "../../User/component/Products";

export default function HomeAdmin() {
    return (
      <div>
        <NavBar />
        <Admin />
      </div>
    )
  }