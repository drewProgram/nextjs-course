# Next.js
Application to master the main concepts of Next

## Initial steps
Install dependencies to use TypeScript:
- `yarn add typescript @types/react @types/node -D`
- Delete useless folders
- Change extensions to .tsx

## Concepts
Main concepts of this framework.

Flow: Browser <-> Next <-> Back-end

### Custom Document (_document)
The _document.tsx file pre-loads all the styles that were generated by the pre-loading of some page and when the node server shows the page it will show with some styles and not just only the html. Here is where you put the outside fonts you want to use, for example.

### Routes
Every folder or file created inside the folder pages will become a route, unless the name starts with _. Eg: a file named search.tsx will become a route /search and a file named products.tsx inside a folder named catalog (pages/catalog/products.tsx) can be accessed at /catalog/products.

#### Dynamic Routing
You can access a dynamic route by naming the file as [].tsx. If you type a name inside the [], you can access this information via router.

### Data Fetch
There are some ways to fetch data from an outside source.

#### Client side fetching
Usual fetch, like in normal React. This approach is that is javascript only, so just use this when you don't need that the google's search engine find this data.

```js
const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

useEffect(() => {
  // it can also be axios
  fetch('http://localhost:3333/recommended').then(response => {
    response.json().then(data => {
      setRecommendedProducts(data);
    })
  });
}, []);
```

#### Server Side Rendering
With server side rendering you receive the data you need to use as props. Only use this when you have to fetch a data which is necessary to appear to the search engine.
```js
import { GetServerSideProps } from 'next';

// at the component function declaration
export default function Home({ recommendedProducts }: IHomeProps){...}

// after the component function
export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
```

#### Static Site Generation
Used when the page does not require big updates. Generates a .html with all the necessary info to be shown to the user. After the html generation, it won't make any new api requests, because all the needed requests are done in the build process.

```js
// at the component function declaration
export default function Top10({ products }) {...}

// after the component function
export const getStaticProps: GetStaticProps<ITop10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();

  return {
    props: {
      products
    },
    // time to the page update (in seconds)
    revalidate: 5,
  }
}
```

## Dynamic
Next.js has some dynamic features beyond routing.

### Dynamic import
You can import some lib only when the user will really use it. This can be done by the following code:
```js
async function handleSum() {
  const math = (await import('../lib/math')).default;

  alert(math.sum(3, 5));
}
```
### Component Lazy Load
Just like the lib import, the component will only be imported when it needs to be shown.
```js
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(
  () => import('../../../components/AddToCartModal'),
  // ssr false is used when the component needs to use some global var that only the
  // browser can access
  { loading: () => <p>Loading...</p>, ssr: false }
);
```

## .env
.env.development and .env.production are variables which will appear on github. More sensitive data you must put on .env.local, which won't go to github.

## Extra
### Styled Components
In order to use styled-components you have to create a babel.config.js filem configurate it, install the plugin `babel-plugin-styled-components` and create a file _document.tsx inside the pages folder.

## CMS
- Prismic for landing pages
- Ghost for blogs
- Contentful for huge projects

### Prismic
- UID - Id created by the user

#### Dependencies
- `yarn add prismic-javascript prismic-dom`
