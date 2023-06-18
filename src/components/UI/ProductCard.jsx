import React from "react";
export default function ParentProductCard({item, setIsSelected}) {

  const handleSelect = () => {
    setIsSelected(item.id)
  };

  return (
    <div>
      {item.ProductName}
      
    </div>  
  //   <div
  //   key={item.id}
  //   className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
  // >
  //   <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
  //     <img
  //       src={item.ProductLink}
  //       alt={item.ProductName}
  //       className="h-full w-full object-cover object-center sm:h-full sm:w-full"
  //     />
  //   </div>
  //   <div className="flex flex-1 flex-col space-y-2 p-4">
  //     <h3 className="text-sm font-medium text-gray-900">
  //       <a href={item.href}>
  //         <span aria-hidden="true" className="absolute inset-0" />
  //         {item.name}
  //       </a>
  //     </h3>
  //     <p className="text-sm text-gray-500">{item.description}</p>
  //     <div className="flex flex-1 flex-col justify-end">
  //       <p className="text-sm italic text-gray-500">{item.options}</p>
  //       <p className="text-base font-medium text-gray-900">{item.price}</p>
  //     </div>
  //   </div>
  // </div>

  );
}