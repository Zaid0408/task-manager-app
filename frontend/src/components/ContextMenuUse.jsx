import { useState } from 'react';

export const useContextMenu = () => {
    const [contextMenu, setContextMenu] = useState({
        isVisible: false,
        position: { x: 0, y: 0 },
        project: null
    });

    const showContextMenu = (event, project) => {
        event.preventDefault(); // Prevent default browser context menu
        setContextMenu({
            isVisible: true,
            position: { x: event.clientX, y: event.clientY },
            project: project
        });
    };

    const hideContextMenu = () => {
        setContextMenu({
            isVisible: false,
            position: { x: 0, y: 0 },
            project: null
        });
    };

    return {
        contextMenu,
        showContextMenu,
        hideContextMenu
    };
};