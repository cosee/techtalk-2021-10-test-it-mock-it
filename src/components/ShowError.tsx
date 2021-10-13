import React from "react";

export const ShowError: React.FC<{error: Error}> = ({error}) => {
    return <div>
        <h1>An error occurred while loading todos</h1>
        <p>{error.message}</p>
    </div>
}
