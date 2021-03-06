import $ from 'jquery';

export default {

  data() {
    return {
      countries: {"US": "United States","GB": "United Kingdom","CA": "Canada","AF": "Afghanistan","AL": "Albania","DZ": "Algeria","AS": "American Samoa","AD": "Andorra","AO": "Angola","AI": "Anguilla","AQ": "Antarctica","AG": "Antigua and Barbuda","AR": "Argentina","AM": "Armenia","AW": "Aruba","AU": "Australia","AT": "Austria","AZ": "Azerbaijan","BS": "Bahamas","BH": "Bahrain","BD": "Bangladesh","BB": "Barbados","BY": "Belarus","BE": "Belgium","BZ": "Belize","BJ": "Benin","BM": "Bermuda","BT": "Bhutan","BO": "Bolivia","BA": "Bosnia and Herzegovina","BW": "Botswana","BV": "Bouvet Island","BR": "Brazil","BQ": "British Antarctic Territory","IO": "British Indian Ocean Territory","VG": "British Virgin Islands","BN": "Brunei","BG": "Bulgaria","BF": "Burkina Faso","BI": "Burundi","KH": "Cambodia","CM": "Cameroon","CT": "Canton and Enderbury Islands","CV": "Cape Verde","KY": "Cayman Islands","CF": "Central African Republic","TD": "Chad","CL": "Chile","CN": "China","CX": "Christmas Island","CC": "Cocos [Keeling] Islands","CO": "Colombia","KM": "Comoros","CG": "Congo - Brazzaville","CD": "Congo - Kinshasa","CK": "Cook Islands","CR": "Costa Rica","HR": "Croatia","CU": "Cuba","CY": "Cyprus","CZ": "Czech Republic","CI": "Côte d’Ivoire","DK": "Denmark","DJ": "Djibouti","DM": "Dominica","DO": "Dominican Republic","NQ": "Dronning Maud Land","DD": "East Germany","EC": "Ecuador","EG": "Egypt","SV": "El Salvador","GQ": "Equatorial Guinea","ER": "Eritrea","EE": "Estonia","ET": "Ethiopia","FK": "Falkland Islands","FO": "Faroe Islands","FJ": "Fiji","FI": "Finland","FR": "France","GF": "French Guiana","PF": "French Polynesia","TF": "French Southern Territories","FQ": "French Southern and Antarctic Territories","GA": "Gabon","GM": "Gambia","GE": "Georgia","DE": "Germany","GH": "Ghana","GI": "Gibraltar","GR": "Greece","GL": "Greenland","GD": "Grenada","GP": "Guadeloupe","GU": "Guam","GT": "Guatemala","GG": "Guernsey","GN": "Guinea","GW": "Guinea-Bissau","GY": "Guyana","HT": "Haiti","HM": "Heard Island and McDonald Islands","HN": "Honduras","HK": "Hong Kong SAR China","HU": "Hungary","IS": "Iceland","IN": "India","ID": "Indonesia","IR": "Iran","IQ": "Iraq","IE": "Ireland","IM": "Isle of Man","IL": "Israel","IT": "Italy","JM": "Jamaica","JP": "Japan","JE": "Jersey","JT": "Johnston Island","JO": "Jordan","KZ": "Kazakhstan","KE": "Kenya","KI": "Kiribati","KW": "Kuwait","KG": "Kyrgyzstan","LA": "Laos","LV": "Latvia","LB": "Lebanon","LS": "Lesotho","LR": "Liberia","LY": "Libya","LI": "Liechtenstein","LT": "Lithuania","LU": "Luxembourg","MO": "Macau SAR China","MK": "Macedonia","MG": "Madagascar","MW": "Malawi","MY": "Malaysia","MV": "Maldives","ML": "Mali","MT": "Malta","MH": "Marshall Islands","MQ": "Martinique","MR": "Mauritania","MU": "Mauritius","YT": "Mayotte","FX": "Metropolitan France","MX": "Mexico","FM": "Micronesia","MI": "Midway Islands","MD": "Moldova","MC": "Monaco","MN": "Mongolia","ME": "Montenegro","MS": "Montserrat","MA": "Morocco","MZ": "Mozambique","MM": "Myanmar [Burma]","NA": "Namibia","NR": "Nauru","NP": "Nepal","NL": "Netherlands","AN": "Netherlands Antilles","NT": "Neutral Zone","NC": "New Caledonia","NZ": "New Zealand","NI": "Nicaragua","NE": "Niger","NG": "Nigeria","NU": "Niue","NF": "Norfolk Island","KP": "North Korea","MP": "Northern Mariana Islands","NO": "Norway","OM": "Oman","PC": "Pacific Islands Trust Territory","PK": "Pakistan","PW": "Palau","PS": "Palestinian Territories","PA": "Panama","PZ": "Panama Canal Zone","PG": "Papua New Guinea","PY": "Paraguay","YD": "People's Democratic Republic of Yemen","PE": "Peru","PH": "Philippines","PN": "Pitcairn Islands","PL": "Poland","PT": "Portugal","PR": "Puerto Rico","QA": "Qatar","RO": "Romania","RU": "Russia","RW": "Rwanda","RE": "Réunion","BL": "Saint Barthélemy","SH": "Saint Helena","KN": "Saint Kitts and Nevis","LC": "Saint Lucia","MF": "Saint Martin","PM": "Saint Pierre and Miquelon","VC": "Saint Vincent and the Grenadines","WS": "Samoa","SM": "San Marino","SA": "Saudi Arabia","SN": "Senegal","RS": "Serbia","CS": "Serbia and Montenegro","SC": "Seychelles","SL": "Sierra Leone","SG": "Singapore","SK": "Slovakia","SI": "Slovenia","SB": "Solomon Islands","SO": "Somalia","ZA": "South Africa","GS": "South Georgia and the South Sandwich Islands","KR": "South Korea","ES": "Spain","LK": "Sri Lanka","SD": "Sudan","SR": "Suriname","SJ": "Svalbard and Jan Mayen","SZ": "Swaziland","SE": "Sweden","CH": "Switzerland","SY": "Syria","ST": "São Tomé and Príncipe","TW": "Taiwan","TJ": "Tajikistan","TZ": "Tanzania","TH": "Thailand","TL": "Timor-Leste","TG": "Togo","TK": "Tokelau","TO": "Tonga","TT": "Trinidad and Tobago","TN": "Tunisia","TR": "Turkey","TM": "Turkmenistan","TC": "Turks and Caicos Islands","TV": "Tuvalu","UM": "U.S. Minor Outlying Islands","PU": "U.S. Miscellaneous Pacific Islands","VI": "U.S. Virgin Islands","UG": "Uganda","UA": "Ukraine","SU": "Union of Soviet Socialist Republics","AE": "United Arab Emirates","ZZ": "Unknown or Invalid Region","UY": "Uruguay","UZ": "Uzbekistan","VU": "Vanuatu","VA": "Vatican City","VE": "Venezuela","VN": "Vietnam","WK": "Wake Island","WF": "Wallis and Futuna","EH": "Western Sahara","YE": "Yemen","ZM": "Zambia","ZW": "Zimbabwe","AX": "Åland Islands",},
      usStates: {"AL":"Alabama","AK":"Alaska","AS":"American Samoa","AZ":"Arizona","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","DC":"District Of Columbia","FM":"Federated States Of Micronesia","FL":"Florida","GA":"Georgia","GU":"Guam","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MH":"Marshall Islands","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","MP":"Northern Mariana Islands","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PW":"Palau","PA":"Pennsylvania","PR":"Puerto Rico","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VI":"Virgin Islands","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"},
      caProvinces: {"AB":"Alberta","BC":"British Columbia","MB":"Manitoba","NB":"New Brunswick","NL":"Newfoundland and Labrador","NS":"Nova Scotia","NT":"Northwest Territories","NU":"Nunavut","ON":"Ontario","PE":"Prince Edward Island","QC":"Québec","SK":"Saskatchewan","YT":"Yukon"},

      email: '',
      fullName: '',
      address: '',
      city: '',
      province: 'AL',
      zip: '',
      countryCode: 'US',

      isPlacingOrder: false,
      addressErrors: [],

      isLoadingPaymentAccounts: true,
      paymentAccounts: [],

      paymentMethod: 'paypal'
    }
  },

  created() {
    this.getPaymentAccounts();
    this.loadAddress();
  },

  methods: {

    getPaymentAccounts() {

      this.isLoadingPaymentAccounts = true;

      this.$hiwebBase.api.get('payment_accounts').then(response => {
        this.paymentAccounts = response.data.data;
        this.isLoadingPaymentAccounts = false;
      }).catch(e => {
        this.paymentMethod = '';
        this.isLoadingPaymentAccounts = false;
      });

    },

    loadAddress() {

      if (this.$hiwebBase.cookie.getCookie('address-id')) {
        
        this.$hiwebBase.api.get('addresses/' + this.$hiwebBase.cookie.getCookie('address-id')).then(response => {
          this.email = response.data.data.attributes.email;
          this.fullName = response.data.data.attributes.full_name;
          this.address = response.data.data.attributes.address1;
          this.city = response.data.data.attributes.city;
          this.province = response.data.data.attributes.province;
          this.zip = response.data.data.attributes.zip;
          this.countryCode = response.data.data.attributes.country_code;
        });

      }

    },

    async placeOrder() {

      this.isPlacingOrder = true;

      // Create address
      this.addressErrors = [];
      let createAddress = await this.$hiwebBase.api.post('addresses', {
        data: {
          type: 'addresses',
          attributes: {
            email: this.email,
            full_name: this.fullName,
            address1: this.address,
            city: this.city,
            province: this.province,
            zip: this.zip,
            country_code: this.countryCode
          }
        }
      }).catch(e => {
        this.addressErrors = e.responseJSON.errors;
      });

      if (this.addressErrors.length) {
        this.isPlacingOrder = false;
        return;
      }

      // Save address to cookie
      this.$hiwebBase.cookie.setCookie('address-id', createAddress.data.data.id);

      // Attach address to cart
      let cartUpdateError = false;
      let cartUpdate = await this.$hiwebBase.cart.update({
        address_id: createAddress.data.data.id
      }).catch(e => {
        cartUpdateError = e.responseJSON.errors;
      });

      if (cartUpdateError) {
        alert(cartUpdateError[0].title);
        this.isPlacingOrder = false;
        return;
      }

      // Redirect to payment
      if (this.paymentMethod === 'paypal') {
        
        // Get payment url
        $.ajax({
          url: '/payment/paypal/create/' + this.cart.data.id,
          dataType: 'json',
          success: result => {

            if (result.status === 'success') {
              window.location = result.approval_url;
              return;
            }

            alert('Failed to redirect you to payment page, please contact us');
            return;

          },
          error: error => {
            alert('Failed to redirect you to payment page, please contact us');
            return;
          }
          
        });
        
        return;

      } else if (this.paymentMethod === 'stripe') {
        this.isPlacingOrder = false;
        alert('This payment method is not supported yet');
        return;
      } else {
        this.isPlacingOrder = false;
        alert('No payment methods available');
        return;
      }
      
    }

  },

  watch: {

    countryCode: function(value) {

      if (value === 'US') {
        this.province = 'AL';
      }

      if (value === 'CA') {
        this.province = 'AB';
      }

    }

  }

}