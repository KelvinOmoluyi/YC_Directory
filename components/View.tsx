import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

import ViewsCount from "./ViewsCount";

const View = async ({id}: {id: string}) => {

    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, {id})

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <ViewsCount id={id} totalViews={totalViews} />
        </div>
    );
}
 
export default View;