import Accordion from '../Accordion/Accordion';

function Faqs() {
    const accordionItems = [
    {
      title: "How does Shortly work?",
      content: "Shortly allows you to create custom short links for your marketing campaigns, which can then be tracked for clicks and sales using Shortly's advanced analytics tools.",
    },
    {
      title: 'Can my links be expired?',
      content: 'No. Links created with your own store domains will never expire and will never stop working unless you closed the store or delete your links.',
    },
    {
      title: 'Will my links stop working if I uninstall the Shortly app?',
      content: 'Yes, you can use Shortly to track the clicks and sales generated by your influencer campaigns.',
    },
  ];
  return (
   <>
   <div className='marginTop20'>
   <Accordion items={accordionItems} />
   </div>
   </>
  );
}
export default Faqs;