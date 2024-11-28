/* eslint-disable @next/next/no-img-element */

import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { Link } from "@inertiajs/react";
import { Badge } from 'primereact/badge';
import { OverlayPanel } from 'primereact/overlaypanel';


const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar, showNotificationSidebar, showTopBarSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const op = useRef(null);
    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/images/logo/-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="100.22px" height={'35px'} alt="logo" />

                {/*<span>LaraReact</span>*/}
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showTopBarSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.topbarSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button" onClick={(e) => op.current.toggle(e)}>
                    <i className="pi pi-bell p-overlay-badge">
                        <Badge value="2"></Badge>
                    </i>
                    <span>Notifications</span>
                </button>
                <OverlayPanel ref={op}>
                    <div className="card">
                        <h5>Notifications</h5>
                        <p>
                            You have <b>2</b> new messages.
                        </p>
                    </div>
                </OverlayPanel>
                <Link href={route('profile.edit')} className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </Link>
                <Link href={route('logout')} method="post" as="button" className="p-link layout-topbar-button">
                    <i className="pi pi-lock"></i>
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
