from django import forms
from .models import Job


class JobForm(forms.ModelForm):

    # ── Choice definitions ──────────────────────────────────────
    JOB_TYPE_CHOICES = [
        ('', '-- Select Job Type --'),
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Contract', 'Contract'),
        ('Freelance', 'Freelance'),
        ('Internship', 'Internship'),
    ]

    EXP_CHOICES = [
        ('', '-- Select Experience Level --'),
        ('Entry-level', 'Entry-level (0–1 yrs)'),
        ('Junior', 'Junior (1–3 yrs)'),
        ('Mid-level', 'Mid-level (3–5 yrs)'),
        ('Senior', 'Senior (5–8 yrs)'),
        ('Lead', 'Lead / Principal (8+ yrs)'),
    ]

    TIME_CHOICES = [
        ('', '-- Select Time Commitment --'),
        ('Full-time', 'Full-time (40 hrs/wk)'),
        ('Part-time', 'Part-time (< 20 hrs/wk)'),
        ('Flexible', 'Flexible hours'),
        ('Shift-based', 'Shift-based'),
    ]

    # ── Override fields that need dropdowns ─────────────────────
    type = forms.ChoiceField(
        choices=JOB_TYPE_CHOICES,
        widget=forms.Select(attrs={
            'class': 'form-select',
        })
    )

    exp = forms.ChoiceField(
        choices=EXP_CHOICES,
        widget=forms.Select(attrs={
            'class': 'form-select',
        })
    )

    time = forms.ChoiceField(
        choices=TIME_CHOICES,
        widget=forms.Select(attrs={
            'class': 'form-select',
        })
    )

    class Meta:
        model = Job
        fields = [
            'cover',
            'title',
            'company',
            'location',
            'time',
            'tags',
            'salary',
            'type',
            'exp',
            'description',
            'required',
            'benefit',
            'companyLocation',
            'employees',
        ]
        widgets = {
            # ── Text inputs ──────────────────────────────────────
            'title': forms.TextInput(attrs={
                'placeholder': 'e.g. Senior Frontend Engineer',
            }),
            'company': forms.TextInput(attrs={
                'placeholder': 'e.g. Acme Corp',
            }),
            'location': forms.TextInput(attrs={
                'placeholder': 'e.g. Cairo, Egypt',
            }),
            'salary': forms.TextInput(attrs={
                'placeholder': 'e.g. $60,000–$80,000/yr',
            }),
            'companyLocation': forms.TextInput(attrs={
                'placeholder': 'e.g. San Francisco, CA',
            }),
            'employees': forms.TextInput(attrs={
                'placeholder': 'e.g. 50–200',
            }),
            'cover': forms.URLInput(attrs={
                'placeholder': 'https://example.com/logo.png',
            }),

         
            'description': forms.Textarea(attrs={
                'rows': 6,
                'placeholder': 'Describe the role, responsibilities, and day-to-day tasks...',
            }),

            'tags': forms.Textarea(attrs={
                'rows': 2,
                'placeholder': '["React", "TypeScript", "Remote"]',
            }),
            'required': forms.Textarea(attrs={
                'rows': 4,
                'placeholder': '["3+ years experience", "Strong communication skills"]',
            }),
            'benefit': forms.Textarea(attrs={
                'rows': 4,
                'placeholder': '["Health insurance", "Remote work", "Stock options"]',
            }),
            
        }

        labels = {
            'cover':           'Company Logo / Cover URL',
            'title':           'Job Title',
            'company':         'Company Name',
            'location':        'Job Location',
            'time':            'Time Commitment',
            'tags':            'Tags',
            'salary':          'Salary / Range',
            'type':            'Job Type',
            'exp':             'Experience Level',
            'description':     'Job Description',
            'required':        'Requirements',
            'benefit':         'Benefits',
            'companyLocation': 'Company HQ Location',
            'employees':       'Number of Employees',
        }






        #naglaa


        #habiba