import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/auth/Auth.tsx", [
        index("routes/base/Home.tsx"),
        route("register", "routes/auth/Register.tsx"),
        route("login", "routes/auth/Login.tsx"),
        route("forgot-password", "routes/auth/ForgotPassword.tsx"),
        route("reset-password", "routes/auth/ResetPassword.tsx"),
        route("verify-email", "routes/auth/VerifyEmail.tsx"),
    ]),

    layout("routes/dashboard/Dash.tsx", [
        route("dashboard", "routes/dashboard/Dashboard.tsx"),
        route("workspaces", "routes/dashboard/workspaces/Workspaces.tsx"),
        route("workspaces/:workspaceId", "routes/dashboard/workspaces/WorkspaceDetails.tsx")
    ])

] satisfies RouteConfig;
