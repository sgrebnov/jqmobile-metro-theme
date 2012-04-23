using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace FormsAll
{
    public class DividerTemplateSelector : DataTemplateSelector
    {
        public DataTemplate DividerSelector
        { 
            get; 
            set; 
        
        }

        public DataTemplate ItemSelector
        { 
            get; 
            set; 
        }

        public override DataTemplate SelectTemplate(object item, DependencyObject container)
           {
               Car itemCars = item as Car;
               if (itemCars != null)
               {
                   if (itemCars.Title.Length == 1)
                   {
                       return DividerSelector;
                   }
                   else
                   {
                       return ItemSelector;
                   }

               }
   
               return base.SelectTemplate(item, container);
           }

    }
}
