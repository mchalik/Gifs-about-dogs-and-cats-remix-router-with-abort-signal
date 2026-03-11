import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/", "./routes/home.tsx"),
    route("/cats", "./routes/cats.tsx"),
    route("/dogs", "./routes/dogs.tsx"),
    route("/api/get-gifs", "./routes/api.get-gifs.ts")
] satisfies RouteConfig;
