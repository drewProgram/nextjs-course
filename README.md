# Nextjs
Application to master the main concepts of Next

## Initial steps
Install dependencies to use TypeScript:
- `yarn add typescript @types/react @types/node -D`
- Delete useless folders
- Change extensions to .tsx

## Concepts
Main concepts of this framework

### Routes
Every folder or file created inside the folder pages will become a route, unless the name starts with _. Eg: a file named search.tsx will become a route /search and a file named products.tsx inside a folder named catalog (pages/catalog/products.tsx) can be accessed at /catalog/products.

#### Dynamic Routing
You can access a dynamic route by naming the file as [].tsx. If you type a name inside the [], you can access this information via router.