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
using System.Collections.ObjectModel;

namespace FormsAll
{
    public class Car
    {
        public string Title 
        { 
            get; 
            set; 
        }

        public string Image
        {
            get;
            set;
        }

        public Car(string title,string image)
        {
            this.Title = title;
            this.Image = image;
        }
    }
}
