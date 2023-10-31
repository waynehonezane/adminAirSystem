export interface Meta {
    icon: string,
    title: string,
    hidden: boolean
}

export interface children {
    path: string,
    component: () => void,
    name: string,
    meta: Meta,
    redirect?: string,
    children?: children[]
}

export interface asyncRoute {
    path: string,
    component: () => void
    name: string,
    redirect: string,
    children: children[]
}

export type userRouteType = string[]
export type asyncRouteType = asyncRoute[]