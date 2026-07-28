// components/about/AboutContent.tsx
import { Button } from '@/components/ui/button';
import { IPage } from '@/types/about.type';
import { Edit, Trash2 } from 'lucide-react';

interface AboutContentProps {
  data: IPage;
  onEdit: () => void;
  onDelete: () => void;
}

export function AboutContent({ data, onEdit, onDelete }: AboutContentProps) {
  return (
    <section className="bg-[hsl(var(--color-background))] text-white py-20">
      <div className="container mx-auto">
        <div className="flex gap-3 justify-end my-1">
          <div>
            <Button onClick={onEdit}>
              <Edit className="w-4 h-4 mr-1" />
              Edit AboutUs
            </Button>
          </div>
          <div>
            <Button onClick={onDelete} variant="destructive">
              <Trash2 className="w-4 h-4 mr-1" />
              Delete AboutUs
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT IMAGES */}
          <div className="relative w-full max-w-[520px] h-[520px] mx-auto">
            <img
              src={data.image_one?.url || '/assets/images/about/about-1-1.png'}
              alt="About main"
              className="absolute top-0 left-0 w-[90%] h-[95%] object-cover rounded-2xl z-10 shadow-xl"
            />
            <img
              src={data.image_two?.url || '/assets/images/about/about-1-2.png'}
              alt="About overlay"
              className="absolute bottom-0 right-0 w-[55%] h-[55%] object-cover rounded-2xl z-20 shadow-2xl border-8 border-black"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <span className="inline-block mb-3 border-l-4 border-slate-700 dark:border-[var(--color-theme)] pl-3 text-sm tracking-widest text-slate-700 font-medium dark:text-[var(--color-theme)]">
              ABOUT US
            </span>

            <h2 className="text-4xl text-black dark:text-slate-50 font-bold leading-tight mb-6">
              {data.title}
            </h2>

            <p className="text-black dark:text-slate-50 mb-8">
              {data.description}
            </p>

            {/* Highlight Card */}
            <div className="bg-neutral-900 dark:bg-slate-900 border border-neutral-800 rounded-xl p-6 mb-8">
              <h4 className="font-semibold mb-2 text-white">
                {data.cardTitle}
              </h4>
              <p className="text-sm text-slate-50">
                {data.cardDescription}
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {data.features?.map((feature, index) => (
                <div key={index} className="flex items-start gap-x-4">
                  <div className="mt-4 flex h-10 w-10 p-3 rounded-full items-center justify-center dark:bg-gray-700 bg-gray-400 text-[var(--color-theme)]">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<i class="${feature.icon}"></i>`,
                      }}
                      className="flex items-center dark:text-white text-black justify-center w-full h-full"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium leading-tight text-black dark:text-slate-50">
                      {feature.title}
                    </h5>
                    <p className="text-sm mt-1 text-black dark:text-slate-50">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="dark:bg-gray-900 bg-slate-300 shadow-md shadow-gray-400 dark:shadow-gray-900 dark:text-white text-black border-2 dark:border-gray-900 dark:hover:bg-slate-800 hover:bg-gray-400 transition px-6 py-3 rounded-lg font-medium">
              {data.btnText || 'More details'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}