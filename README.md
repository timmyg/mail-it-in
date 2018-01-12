## Lean, Mean Meteor Boilerplate
![](http://res.cloudinary.com/dcdth9fpg/image/upload/v1514491986/pexels-photo-378308_1_qwsttp.jpg)

## Basic Overview

A basic meteor boilerplate that uses common technologies for fast-paced, lean development including:

* Full routing and logic for sign in, register, forgot/reset password out of the box
* Admin page (role-based) so that you can do admin/owner stuff inside your app not available to your common users
* [Segment](segment.com) for analytics and event tracking
* [Material Design Icons](https://materialdesignicons.com) for an icon library, which includes official Google Material Design icons as well as thousands of community-contributed icons
* [Bootstrap 4](https://getbootstrap.com/docs/4.0) Sass allowing overrides of bootstrap library and defaults
* [S-alert](http://s-alert.meteorapp.com/) for clean, sexy alerts
* [Stripe](http://stripe.com/) for credit card processing, using the new v3 Elements
* [Web Font Loader](https://github.com/typekit/webfontloader) for easily loading web fonts

## Development

First, ensure you have [meteor](https://www.meteor.com/install) installed, then clone this repository

#### Install Dependencies
```
npm i
```

#### Start App
```
npm start
```

#### Initialize Analytics
If you want to use Segment for analytics and tracking, do the following:
* Go to [Segment](segment.com), create an account, and copy your *Write Key*
* Create a settings.json in the root of this project like so:
```
{
  "public": {
    "segment": {
      "key": "YOUR-WRITE-KEY-HERE"
    }
  }
}

```

Learn more about meteor settings [here](https://docs.meteor.com/api/core.html#Meteor-settings)

> If you would prefer not use Segment, you can delete any `analytics` code references in files under the `client` folder to prevent errors

#### Icon Library Usage
You can use Material design icons by simply writing the following html:
```
	<i class="mdi mdi-face mdi-24px"></i>
```

> Note: mdi-24px is not required, but is a consistent way to size icons differently, see [here](https://materialdesignicons.com/getting-started). You can also color, rotate, and do other fancy things with just class names

If you want to use a different icon library, feel free to do so. For example, if you would prefer to use [ionicons](http://ionicons.com/), do the following:
```
meteor remove cleandersonlobo:mdi-icons
meteor add pagebakers:ionicons
```

#### Admin Role
Add the below field to `settings.json` to give admin roles to users with specific email addresses
```
  "private": {
    "adminEmails": "bob_the_owner@gmail.com,heather_developer@gmail.com"
  }
}
```

> Note: Users must already be created (via /register). The script to add the admin role runs at startup, so you'll have to restart if you recently created the user or added to the adminEmails variable
