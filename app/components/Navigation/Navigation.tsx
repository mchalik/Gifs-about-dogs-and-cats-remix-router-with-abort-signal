import { NavLink, type NavLinkRenderProps } from 'react-router'

export const Navigation = () => {
    const classNameNavLink = ({ isActive }: NavLinkRenderProps) => isActive ? "active-link" : "";

    return (
        <div className='navigation'>
            <NavLink to="/cats" className={classNameNavLink}>Коты</NavLink>
            <NavLink to="/dogs" className={classNameNavLink}>Собаки</NavLink>
        </div>
    );
};