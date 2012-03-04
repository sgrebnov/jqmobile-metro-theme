using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using System.Windows.Media.Imaging;
using System.Collections.ObjectModel;

namespace FormsAll
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();
        }

        private void PhoneApplicationPage_Loaded(object sender, RoutedEventArgs e)
        {
            this.FillListBox();
            this.FillBigListPicker();
            this.FillSmallListPicker();
        }

        private void hyperlinkButton1_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Sample message");            
        }

        private void hyperlinkButton2_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("This is a dialog box", "Dialog caption", MessageBoxButton.OKCancel);
        }

        private void imageButtonText_ManipulationStarted(object sender, ManipulationStartedEventArgs e)
        {
            imageButtonImage.Source = getImageSource("Images/appbar.favs.rest.black.png");
        }

        private void imageButtonText_ManipulationCompleted(object sender, ManipulationCompletedEventArgs e)
        {
            imageButtonImage.Source = getImageSource("Images/appbar.favs.rest.white.png");
        }

        private void toggleButton2_Checked(object sender, RoutedEventArgs e)
        {
            
        }

        private void toggleButton2_Unchecked(object sender, RoutedEventArgs e)
        {
            
        }

        private ImageSource getImageSource(string imageUri)
        {
            Image image = new Image();
            BitmapImage bitmap = new BitmapImage();            
            bitmap.UriSource = new Uri(imageUri, UriKind.Relative);
            return bitmap;           
        }

        private void FillListBox()
        {
            ObservableCollection<Car> listBoxItems = new ObservableCollection<Car>();
            listBoxItems.Add(new Car("a", null));
            listBoxItems.Add(new Car("Acura", "Images/empty.jpg"));
            listBoxItems.Add(new Car("Audi", "Images/empty.jpg"));
            listBoxItems.Add(new Car("b", null));
            listBoxItems.Add(new Car("BMW", "Images/empty.jpg"));
            listBoxItems.Add(new Car("c", null));
            listBoxItems.Add(new Car("Cadillac", "Images/empty.jpg"));
            listBoxItems.Add(new Car("Chrysler", "Images/empty.jpg"));
            listBox.ItemsSource = listBoxItems;
        }

        private void FillBigListPicker()
        {
            ObservableCollection<String> listPickerItems = new ObservableCollection<String>();
            listPickerItems.Add("Alabama");
            listPickerItems.Add("Alaska");
            listPickerItems.Add("Arizona");
            listPickerItems.Add("Arkansas");
            listPickerItems.Add("California");
            listPickerItems.Add("Colorado");
            listPickerItems.Add("Connecticut");
            listPickerItems.Add("Delaware");
            listPickerItems.Add("Florida");
            listPickerItems.Add("Georgia");
            listPickerItems.Add("Hawaii");
            listPickerItems.Add("Idaho");
            listPickerItems.Add("Illinois");
            listPickerItems.Add("Indiana");
            listPickerItems.Add("Iowa");
            listPickerItems.Add("Kansas");
            listPickerItems.Add("Kentucky");
            listPickerItems.Add("Louisiana");
            listPickerItems.Add("Maine");
            listPickerItems.Add("Maryland");
            listPickerItems.Add("Massachusetts");
            listPickerItems.Add("Michigan");
            listPickerItems.Add("Minnesota");
            listPickerItems.Add("Mississippi");
            listPickerItems.Add("Missouri");
            listPickerItems.Add("Montana");
            listPickerItems.Add("Nebraska");
            listPickerItems.Add("Nevada");
            listPickerItems.Add("New Hampshire");
            listPickerItems.Add("New Jersey");
            listPickerItems.Add("New Mexico");
            listPickerItems.Add("New York");
            listPickerItems.Add("North Carolina");
            listPickerItems.Add("North Dakota");
            listPickerItems.Add("Ohio");
            listPickerItems.Add("Oklahoma");
            listPickerItems.Add("Oregon");
            listPickerItems.Add("Pennsylvania");
            listPickerItems.Add("Rhode Island");
            listPickerItems.Add("South Carolina");
            listPickerItems.Add("South Dakota");
            listPickerItems.Add("Tennessee");
            listPickerItems.Add("Texas");
            listPickerItems.Add("Utah");
            listPickerItems.Add("Vermont");
            listPickerItems.Add("Virginia");
            listPickerItems.Add("Washington");
            listPickerItems.Add("West Virginia");
            listPickerItems.Add("Wisconsin");
            listPickerItems.Add("Wyoming");
            listPicker2.ItemsSource = listPickerItems;
        }

        private void FillSmallListPicker()
        {
            ObservableCollection<String> listPickerItems = new ObservableCollection<String>();
            listPickerItems.Add("Standard: 7 day");
            listPickerItems.Add("Rush: 3 days");
            listPickerItems.Add("Express: next day");
            listPickerItems.Add("Overnight");
            listPicker1.ItemsSource = listPickerItems;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new Uri("/PluginsPage.xaml", UriKind.Relative));
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new Uri("/OtherControlPage.xaml", UriKind.Relative));
        }

    }
}