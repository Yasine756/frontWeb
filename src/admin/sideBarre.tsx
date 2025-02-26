import { MoreVertical, ChevronLast, ChevronFirst, Home, User, Mail,Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContext, createContext, useState, ReactNode } from "react";
import logo from '../assets/logo.png'
import './sideBarre.css';

// Définir le contexte pour l'extension du sidebar
interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children?: ReactNode;
}

export default function SideBarre({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <div className="sidebar__header">
          <img
            src={logo}
            className={`sidebar__logo ${expanded ? "expanded" : "collapsed"}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="sidebar__toggle"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="sidebar__menu">
            <SidebarItem icon={<Home size={20} />} text="Accueil Admin" to="/admin" />
            <SidebarItem icon={<User size={20} />} text="Accueil Caissier" to="/caissier" />
            <SidebarItem icon={<Mail size={20} />} text="Contact Admin" to="/admin/contact" />
            <SidebarItem icon={<Plus size={20} />} text="Add yassine" to="/admin/yassine" />
            
          </ul>
        </SidebarContext.Provider>

        <div className="sidebar__footer">
          {/* <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="sidebar__avatar"
          /> */}
          <div className="sidebar__avatar">YS</div>
          <div className={`sidebar__profile ${expanded ? "expanded" : "collapsed"}`}>
            <div className="sidebar__profile-info">
              
              <span className="sidebar__profile-email">yassine@gmail.com</span>
            </div>
           
          </div>
        </div>
      </nav>    
    </aside>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  to: string;
}

export function SidebarItem({ icon, text, to }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext) || { expanded: true };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `sidebar__item ${isActive ? "active" : ""}`;  // `active` uniquement si le lien est actif
      }}
      end // Assurez-vous que le lien n'est actif que pour le chemin exact
    >
      {icon}
      <span className={`sidebar__item-text ${expanded ? "expanded" : "collapsed"}`}>
        {text}
      </span>
    </NavLink>
  );
}
