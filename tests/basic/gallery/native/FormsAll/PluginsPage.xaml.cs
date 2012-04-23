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
using System.Threading;
using System.Windows.Media.Imaging;

namespace FormsAll
{
    public partial class PluginsPage : PhoneApplicationPage
    {
        private bool isDark;

        private string blackImgPath = "Images/appbar.feature.settings.rest.black.png";
        private string whiteImgPath = "Images/appbar.feature.settings.rest.white.png";
        
        public PluginsPage()
        {
            InitializeComponent();
            getTheme();
            BitmapImage image = this.Resources["toggleImg"] as BitmapImage;
            string imgPath = isDark ? whiteImgPath : blackImgPath;
            image.UriSource = new Uri(imgPath, UriKind.Relative);
        }

        private Timer timer;

        private bool isInProgerss = false;

        private void button1_Click(object sender, RoutedEventArgs e)
        {
            progressBar1.IsIndeterminate = !progressBar1.IsIndeterminate;
        }

        private void getTheme()
        {
            Color themeColor = (Color)Application.Current.Resources["PhoneForegroundColor"];

            if (themeColor.ToString() == "#FFFFFFFF")
            {
                isDark = true;
            }
            else if (themeColor.ToString() == "#DE000000")
            {
                isDark = false;
            }  
        }

        private void button2_Click(object sender, RoutedEventArgs e)
        {
            if (isInProgerss)
            {
                timer.Dispose();
                isInProgerss = false;
            }
            else
            {
                progressBar1.Value = 0;
                isInProgerss = true;
                timer = new Timer(UpdateProgressBar, null, 0, 50);
            }
            
            
        }

        private void UpdateProgressBar(object obj)
        {
            Deployment.Current.Dispatcher.BeginInvoke( () => 
            {
                progressBar1.Value++;
                if(progressBar1.Value >= 100){
                    timer.Dispose();
                }
            } );
        }

        private void toggleButton2_Checked(object sender, RoutedEventArgs e)
        {            
            toggleButton2.Tag = "Image/appbar.favs.rest.dark.png";
        }

        private void toggleButton2_Unchecked(object sender, RoutedEventArgs e)
        {
            BitmapImage image = this.Resources["toggleImg"] as BitmapImage;
            string imgPath = isDark?whiteImgPath:blackImgPath;
            image.UriSource = new Uri(imgPath, UriKind.Relative);
        }

        private void toggleButton2_Checked_1(object sender, RoutedEventArgs e)
        {
            BitmapImage image = this.Resources["toggleImg"] as BitmapImage;
            string imgPath = isDark ? blackImgPath : whiteImgPath;
            image.UriSource = new Uri(imgPath, UriKind.Relative);
        }
    }
}