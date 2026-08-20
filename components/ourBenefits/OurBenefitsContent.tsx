// // components/our-benefits/OurBenefitsContent.tsx
// import { Button } from '@/components/ui/button';
// import { OurBenefits } from '../../types/benefit.types';
// import { Edit, Trash2, Check } from 'lucide-react';

// interface ContentProps {
//   data: OurBenefits;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// export function OurBenefitsContent({ data, onEdit, onDelete }: ContentProps) {
//   return (
//     <div className="space-y-8">
//       <div className="flex justify-end gap-3">
//         <Button onClick={onEdit}><Edit className="w-4 h-4 mr-1" /> Edit</Button>
//         <Button variant="destructive" onClick={onDelete}><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
//       </div>

//       <div className="overflow-hidden">
//         {/* Main Content Card */}
//         <div className="rounded-[20px] bg-gradient-to-br from-[hsl(var(--color-background))] to-[hsl(var(--color-background)/0.95)] dark:from-[hsl(var(--color-background-dark))] dark:to-[hsl(var(--color-background-dark)/0.95)] shadow-lg border-2 p-5">
//           <div className="mb-8 text-center">
//             <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
//               <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               {data.title}
//             </h1>
//             <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
//               {data.subHeading}
//             </p>
//             <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
//           </div>

//           <div className="flex justify-center mb-8">
//             <button className="px-8 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
//               {data.btnText}
//             </button>
//           </div>

//           {/* Featured Items */}
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">Features</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {data.featured.map((feature, idx) => (
//                 <div key={idx} className="p-6 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-lg bg-blue-50 dark:bg-blue-900/20">
//                   <div className="flex items-start space-x-4">
//                     {feature.image?.url && (
//                       <div className="mt-1 flex-shrink-0">
//                         <img src={feature.image.url} alt={feature.heading} className="w-20 h-20 object-cover rounded-lg" />
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2">
//                         <div dangerouslySetInnerHTML={{ __html: `<i class="${feature.icon} text-xl text-blue-600 dark:text-blue-400"></i>` }} />
//                         <h3 className="font-bold text-xl">{feature.heading}</h3>
//                       </div>
//                       <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* List Items */}
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">Benefits List</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {data.list.map((item, idx) => (
//                 <div key={idx} className="flex items-center p-4 rounded-lg border bg-gray-50 dark:bg-gray-900 hover:scale-[1.02] hover:shadow-lg transition-all">
//                   <span className="font-medium">{item.list}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// components/our-benefits/OurBenefitsContent.tsx
import { Button } from '@/components/ui/button';
import { OurBenefits } from '@/types/benefit.types';
import { Edit, Trash2, Check } from 'lucide-react';

interface ContentProps {
  data: OurBenefits;
  onEdit: () => void;
  onDelete: () => void;
}

export function OurBenefitsContent({ data, onEdit, onDelete }: ContentProps) {
  // Use the first featured item's image as main image (optional)
  const mainImage = data.featured?.[0]?.image?.url;

  return (
    <div className="overflow-hidden">
      {/* Header with Edit/Delete buttons */}
      <div className="flex justify-between items-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{data.subHeading}</p>
          <p className="text-blue-600 dark:text-blue-400 text-sm">Button: {data.btnText}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onEdit} variant="outline">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button onClick={onDelete} variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      {/* Main Content Card (exactly as in first example) */}
      <div className="rounded-[20px] bg-gradient-to-br from-[hsl(var(--color-background))] to-[hsl(var(--color-background)/0.95)] dark:from-[hsl(var(--color-background-dark))] dark:to-[hsl(var(--color-background-dark)/0.95)] shadow-lg border-2 p-5">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            {data.subHeading}
          </p>
          {/* Optional sub_heading – you can add a new field if needed */}
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Button Display */}
        <div className="flex justify-center mb-8">
          <button className="px-8 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            {data.btnText}
          </button>
        </div>

        {/* Main Image (use first featured image) */}
        {mainImage && (
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <img
                src={mainImage}
                alt={data.title}
                className="rounded-lg object-cover w-full h-64 md:h-80"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Features Grid (using data.featured) */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.featured.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-lg bg-blue-50 dark:bg-blue-900/20"
              >
                <div className="flex items-start space-x-4">
                  {feature.image?.url && (
                    <div className="mt-1 flex-shrink-0">
                      <img
                        src={feature.image.url}
                        alt={feature.heading}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<i class="${feature.icon} text-xl text-blue-600 dark:text-blue-400"></i>`,
                        }}
                      />
                      <h3 className="font-bold text-xl">{feature.heading}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature List (data.list) – if you want icons, add an 'icon' field to ListItem */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">Benefits List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.list.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 rounded-lg border bg-gray-50 dark:bg-gray-900 hover:scale-[1.02] hover:shadow-lg transition-all"
              >
                {/* If you add icon field: <i className="..."></i> */}
                <span className="font-medium">{item.list}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}