import { useRef, useState,  } from 'react';
import { Navigation } from '../components/Navigation/Navigation';

type ImageType = {
  images: {
    original: {
      webp: string
    }
  }
}

export function Cats() {
  const [data, setData] = useState<ImageType[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const activeAbortController = useRef<AbortController>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = async (event) => {
    const value = event.target.value;
    
    try {
      if (activeAbortController.current) {
        activeAbortController.current.abort();
      }

      if (!value) {
        setIsLoading(false);
        setData([]);
        setError(null);

        return;
      }
      setIsLoading(true)

      const controller = new AbortController();
      activeAbortController.current = controller;
      const signal = controller.signal;

      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_API_URL}&q=Кот ${value}&limit=${5}`,
        { signal }
      )
      const json = await response.json();
      setData(json.data);
      console.log(json);
    } catch (error) {
      if ((error as any).name === 'AbortError') {
        console.log(error)
      } else {
        setError(error as any);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <Navigation />
        <div className="w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <ul>
              <div className='custom-field'>
                <label htmlFor="custom-input">Какую гифку про котов показать?</label>
                <input type="text" onChange={onChange} id='custom-input' />
              </div>
              {isLoading ? 'Згрузка' : ''}

              <div className='images'>
                {data?.map((gif => <img src={gif.images.original.webp}/>))}
              </div>
              {error && JSON.stringify(error)}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
