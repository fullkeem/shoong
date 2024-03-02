// import PhocaItem from '../PhocaItem/PhocaItem';
// import pb from '@/api/pocketbase';
// import { useState, useEffect } from 'react';

// export default function PhocaContainer() {
//   const [phoca, setPhoca] = useState([]);

//   useEffect(() => {
//     const phoca = pb.collection('groups').getFullList({
//       expand: 'photoCards',
//     });
//     pb.autoCancellation();
//     phoca.then((phocaData) => {
//       setPhoca(phocaData);
//       console.log(phocaData);
//     });
//   }, []);

//   return (
//     <div className="">
//       <ul>
//         {phoca.map((group, groupIndex) => {
//           return group.photoCards.map((card, cardIndex) => (
//             <li
//               key={`${groupIndex}-${cardIndex}`}
//               className="list-none m-0 p-0 w-44 h-353pxr relative"
//             >
//               <PhocaItem
//                 ariaLabel={`${card.title} 카드 디테일 페이지로 이동`}
//                 phocaImgSrc={`https://shoong.pockethost.io/api/files/photoCards/${card.id}/${card.cardImg}`}
//                 phocaImgAlt={`${card.title} 카드`}
//                 logoImgSrc={`https://shoong.pockethost.io/api/files/groups/${group.id}/${group.logoImage}`}
//                 logoAltText={group.groupName}
//                 groupName={group.groupName}
//                 artistName={card.memberName}
//                 title={card.title}
//                 likeCount={card.likeCount}
//               />
//             </li>
//           ));
//         })}
//       </ul>
//     </div>
//   );
// }
