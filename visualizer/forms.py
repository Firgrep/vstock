from django import forms

class TickerForm(forms.Form):
    ticker = forms.CharField(label=False, max_length=5, widget=forms.TextInput(attrs={'placeholder': 'Enter a symbol'}))