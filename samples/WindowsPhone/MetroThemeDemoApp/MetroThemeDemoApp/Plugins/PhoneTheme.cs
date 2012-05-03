/*
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Copyright (c) 2011-2012, Sergey Grebnov
 */

using System.Runtime.Serialization;
using WP7CordovaClassLib.Cordova;
using WP7CordovaClassLib.Cordova.Commands;
using WP7CordovaClassLib.Cordova.JSON;
using Microsoft.Phone.Shell;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Phone.Controls;
using System.Windows;
using Microsoft.Phone.Tasks;
using System.Windows.Media;

namespace Cordova.Extension.Commands
{

    public class PhoneTheme : BaseCommand
    {
        #region Constants

        #endregion

        #region Command options

        /// <summary>
        /// Represents selected on device theme
        /// </summary>
        [DataContract]
        public class PhoneThemeInfo
        {
 
            [DataMember(IsRequired = false, Name = "backgroundColor")]
            public string BackgroundColor { get; set; }

            [DataMember(IsRequired = false, Name = "isDark")]
            public bool IsDark { get; set; }

            [DataMember(IsRequired = false, Name = "isLight")]
            public bool IsLight { get; set; }

            [DataMember(IsRequired = false, Name = "accentColor")]
            public string AccentColor { get; set; }

        }
        #endregion

        public void get(string options)
        {
                      
            try
            {
                Deployment.Current.Dispatcher.BeginInvoke(() =>
                {
                    try
                    {
                        PhoneThemeInfo themeInfo = new PhoneThemeInfo();

                        themeInfo.BackgroundColor = this.ColorToHtmlHex((Color)Application.Current.Resources["PhoneBackgroundColor"]);

                        themeInfo.IsLight = (Visibility)Application.Current.Resources["PhoneLightThemeVisibility"] == Visibility.Visible;
                        themeInfo.IsDark = (Visibility)Application.Current.Resources["PhoneDarkThemeVisibility"] == Visibility.Visible;

                        themeInfo.AccentColor = this.ColorToHtmlHex((Color)Application.Current.Resources["PhoneAccentColor"]);

                        DispatchCommandResult(new PluginResult(PluginResult.Status.OK, themeInfo));
                    }
                    catch (Exception e)
                    {
                        DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, e.Message));
                    }

                });                                
            }
            catch (Exception e)
            {
                DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR, "Error occured while retrieving phone theme settings."));
            }
        }

        string ColorToHtmlHex(Color color)
        { 
            return String.Format("#{0:X2}{1:X2}{2:X2}", 
                color.R,
                color.G,
                color.B);
        }

    }
}